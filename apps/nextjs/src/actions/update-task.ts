"use server"

import { db, quest, tasks } from "@peakquest/db"
import { asc, eq } from "drizzle-orm"


export async function updateTask(taskId: number, value: boolean) {
	return db.update(tasks)
		.set({ isComplete: value })
		.where(eq(tasks.id, taskId))
		.returning();
}

export async function setCurrentTask() {
	try {
		// Fetch the next incomplete task
		const tasksList = await db.select().from(tasks)
            .where(eq(tasks.isComplete, false))
            .orderBy(asc(tasks.id))

		if(!tasksList[0]) return null;
		const nextTask = tasksList[0]

		// update the current task in the quest table
		const updatedQuest = await db.update(quest)
            .set({ currentTask: nextTask.index! })
            .where(eq(quest.id, nextTask.questId))
            .returning();

        return nextTask.index;
	} catch (error) {
		console.log(error);
		throw new Error('Failed to get incomplete task');
	}
}
