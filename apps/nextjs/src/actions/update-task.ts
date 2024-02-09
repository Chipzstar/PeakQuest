"use server"

import { db, quest, tasks } from "@peakquest/db"
import { asc, eq, and } from "drizzle-orm"
import { COMPLETE_INDEX } from "~/app/utils";


export async function updateTask(taskId: number, value: boolean) {
	try {
		await db.update(tasks)
			.set({ isComplete: value })
			.where(eq(tasks.id, taskId))
			.returning();
	} catch (err) {
		console.error(err)
		throw new Error('Failed to update task');
	}
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

		// check if all tasks are completed
		//if so mark the quest as complete and return COMPLETE_INDEX = 12
		if (tasksList.length === 0) {
			// set the current task to COMPLETE_INDEX = 12 in the quest table
			const updatedQuest = await db.update(quest)
				.set({ currentTask: COMPLETE_INDEX, isComplete: true })
				.where(eq(quest.id, questId))
				.returning();
			return COMPLETE_INDEX;
		}

		if (!tasksList[0]) return 0;
		// return the index of the first task that is not completed
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
