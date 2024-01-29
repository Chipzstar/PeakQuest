"use server"

import type { GoalState } from "~/app/lib/store"
import { v4 as uuidv4 } from 'uuid';
import { db } from "@1goal/db"
import { quest } from "node_modules/@1goal/db/src/schema/quest"

export async function saveGoal(data: GoalState) {
    // TODO: Save user info too

    const goalParams = data
    delete goalParams.oneGoal

    await db.insert(quest).values({
        id: uuidv4(),
        createdBy: "",
        goal: data.oneGoal as string,
        goalParams: goalParams,
        promptId: 1,
        isResponseValid: false
    })

}