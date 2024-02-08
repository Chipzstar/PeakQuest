"use server"

import { db, quest, tasks } from "@peakquest/db"
import { asc, eq, and } from "drizzle-orm"


export async function updateTask(taskId: number, value: boolean) {
	await db.update(tasks)
		.set({ isComplete: value })
		.where(eq(tasks.id, taskId))
		.returning();
}

export async function setCurrentTask(questId: string) {
	try {
		// Fetch the next incomplete task
		const tasksList = await db.select().from(tasks)
			.where(
				and(
					eq(tasks.isComplete, false),
					eq(tasks.questId, questId),
				))
			.orderBy(asc(tasks.id))

		if (!tasksList[0]) return 0;
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
