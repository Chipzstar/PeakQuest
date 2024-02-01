"use server"

import type {GoalState} from "~/app/lib/store"
import {v4 as uuidv4} from 'uuid';
import {db, quest} from "@peakquest/db"

type Quest = typeof quest.$inferInsert;

export async function saveGoal(data: GoalState): Promise<Quest> {
    // TODO: Save user info too
    try {
        const {oneGoal, ...goalParams } = data;
        const id = uuidv4();
        const result = await db.insert(quest).values({
            id,
            createdBy: "",
            goal: oneGoal!,
            goalParams: goalParams,
            promptId: 1,
            isResponseValid: false,
            rawOpenAIResponse: "",
            openAIResponse: ""
        })

        return result.toJSON() as Quest
    } catch (err) {
        console.error(err)
        throw err
    }
}
