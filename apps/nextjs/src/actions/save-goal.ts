"use server"

import type { GoalState } from "~/app/lib/store"
import { v4 as uuidv4 } from 'uuid';
import { db, prompts, quest, users } from "@peakquest/db"
import { eq } from 'drizzle-orm';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY']
});

async function getUserId(email: string, name: string): Promise<string> {
    try {
        let newId = uuidv4()

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
    // TODO: validate incoming data with zod

    const userId = await getUserId(data.email, data.name)

    const prompt = prompts[0]
    const promptId = prompt.id
    const rawPrompt = prompts[0].prompt

    const promptMapping = {
        "GOAL_INPUT": data.oneGoal,
        "TIME_FRAME": data.timeline,
        "DAYS_AVAILABLE": data.daysPerWeekAvailable,
        "CURRENT_LEVEL": data.currentLevel
    }

    let updatedPrompt = rawPrompt

    Object.entries(promptMapping).forEach((entry) => {
        const key = entry[0]
        const val = entry[1]

        updatedPrompt = updatedPrompt.replace(key, val)
    })


    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'system', content: updatedPrompt }],
        model: 'gpt-3.5-turbo-1106',
    });

    const rawResponse = chatCompletion.choices[0]?.message.content

    let parsedResponse;
    let isValid;
    try {
        parsedResponse = JSON.parse(rawResponse as string)
        isValid = true;
    } catch (error) {
        console.log("could not parse openAI response");
        parsedResponse = null
        isValid = false;
    }

    const goalParams = { ...data, name: undefined, email: undefined }
    delete goalParams.oneGoal
    delete goalParams.name
    delete goalParams.email

    let questId = uuidv4()

    await db.insert(quest).values({
        id: questId,
        createdBy: userId,
        goal: data.oneGoal as string,
        goalParams: goalParams,
        promptId: promptId,
        isResponseValid: isValid,
        rawOpenAIResponse: rawResponse,
        openAIResponse: isValid ? rawResponse : null
    })

    return questId
}
