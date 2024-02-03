"use server"

import { db, character, quest } from "@peakquest/db"
import { eq } from "drizzle-orm"



export async function updateCharacter(questId: string, characterId: number) {
    await db.update(quest).set({ characterId }).where(eq(quest.id, questId))
}
