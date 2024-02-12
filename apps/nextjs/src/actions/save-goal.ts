"use server"

import type { GoalState } from "~/app/lib/store"
import { v4 as uuidv4 } from 'uuid';
import { db, prompts, quest, users, tasks } from "@peakquest/db"
import { eq } from 'drizzle-orm';
import OpenAI from 'openai';
import { Resend } from "resend";
import { WelcomeEmail } from "@peakquest/email"

function withRetryAndTimeout<T extends any[], R>(
    asyncFunc: (...args: T) => Promise<R>,
    timeoutMs: number,
    maxRetries: number = 3
): (...args: T) => Promise<R> {
    let retries = 0;

    function timeoutPromise(): Promise<R> {
        return new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), timeoutMs));
    }

    async function attempt(...args: T): Promise<R> {
        try {
            return await Promise.race([asyncFunc(...args), timeoutPromise()]);
        } catch (error) {
            if (error instanceof Error && error.message === 'Timeout' && retries < maxRetries) {
                console.log(`Attempt ${retries + 1} failed due to timeout, retrying...`);
                retries++;
                return attempt(...args);
            } else {
                throw error;
            }
        }
    }

    return attempt;
}



type Tasks = typeof tasks.$inferInsert[];

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const resend = new Resend(process.env.RESEND_API_KEY);


async function getUserId(email: string, name: string): Promise<string> {
    try {
        const newId = uuidv4()

        await db.insert(users).values({
            id: newId,
            email: email,
            name: name,
            emailVerified: false,
        })

        return newId

    } catch (error) {
        let res = await db.select().from(users).where(eq(users.email, email))
        return res[0]?.id as string
    }
}

export async function saveGoal(data: GoalState & { name: string, email: string }): Promise<string> {
    const retryFn = withRetryAndTimeout(saveGoal_INTERNAL, 15000, 2)
    return retryFn(data)
}

export async function saveGoal_INTERNAL(data: GoalState & { name: string, email: string }): Promise<string> {
    // TODO: validate incoming data with zod

    const userId = await getUserId(data.email, data.name)

    const prompt = prompts[0]
    const promptId = prompt.id
    const rawPrompt = prompts[0].prompt

    const promptMapping = {
        "GOAL_INPUT": data.oneGoal,
        "TIME_FRAME": data.timeline,
        "DAYS_AVAILABLE": data.daysPerWeekAvailable,
        "CURRENT_LEVEL": data.currentLevel,
        "ANTICIPATED_CHALLENEGES": data.challengesFaced == "" ? "None" : data.challengesFaced
    }

    let updatedPrompt = rawPrompt

    Object.entries(promptMapping).forEach((entry) => {
        const key = entry[0]
        const val = entry[1]

        updatedPrompt = updatedPrompt.replace(key, val)
    })

    try {
        const chatCompletion = await openai.chat.completions.create({
            messages: [{
                role: "system",
                content: "You are a machine that only returns and replies with valid, iterable RFC8259 compliant JSON in your responses"
            }, { role: 'assistant', content: updatedPrompt }],
            model: 'gpt-3.5-turbo-0125',
        });
        const rawResponse = chatCompletion.choices[0]?.message.content?.replace(/```json|```/g, "")

        let parsedResponse: { task_name: string, task_description: string }[] | undefined;
        let isValid: boolean;

        try {
            parsedResponse = JSON.parse(rawResponse as string)
            isValid = true;
        } catch (error) {
            console.log("could not parse openAI response");
            isValid = false;
        }

        const goalParams = { ...data, name: undefined, email: undefined }
        delete goalParams.oneGoal
        delete goalParams.name
        delete goalParams.email

        const questId = uuidv4()


        await db.transaction(
            async (tx) => {
                await tx.insert(quest).values({
                    id: questId,
                    createdBy: userId,
                    goal: data.oneGoal as string,
                    goalParams: goalParams,
                    promptId: promptId,
                    isResponseValid: isValid,
                    rawOpenAIResponse: rawResponse,
                    openAIResponse: isValid ? rawResponse : null
                })

                if (isValid && parsedResponse !== undefined) {
                    const newTasks: Tasks = parsedResponse.map((x, index) => {
                        return {
                            questId,
                            index,
                            name: x.task_name,
                            description: x.task_description,
                            isComplete: false,
                        }
                    })

                    await tx.insert(tasks).values(newTasks)
                }
            }, {
            behavior: "deferred",
        }
        );

        if (process.env.NODE_ENV !== "development" || process.env.VERCEL_ENV === "production") {
            await resend.emails.send({
                from: "PeakQuest <notifications.peakquest.app≥",
                to: data.email,
                subject: "Your PeakQuest awaits",
                react: WelcomeEmail({ name: data.name, quest: data.oneGoal, questId: questId })
            }).catch((e) => console.log(e))

            console.log("Email sent for quest with id: ", questId);

        }

        return questId;
    } catch (error) {
        console.error("There was an error generating your tasks:", error)
        throw error
    }
}
