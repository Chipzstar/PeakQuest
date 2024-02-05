"use server"

import { db, tasks } from "@peakquest/db"
import { eq } from "drizzle-orm"


export async function updateTask(taskId: number, value: boolean) {
    await db.update(tasks).set({ isComplete: value }).where(eq(tasks.id, taskId))
}
