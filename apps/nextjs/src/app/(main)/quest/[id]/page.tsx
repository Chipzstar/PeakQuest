import React from 'react';
import Mountain from './Mountain';
import { db, quest, tasks } from '@peakquest/db';
import { notFound } from "next/navigation";
import { eq, asc } from 'drizzle-orm';


const Quest = async ({ params }: { params: { id: string } }) => {
    const questId = params.id;

    const questDbRes = await db.query.quest.findFirst({
        where: eq(quest.id, questId),
        with: {
            tasks: {
                orderBy: [asc(tasks.index)]
            }
        }
    })

    if (questDbRes == undefined) {
        notFound();
    }

    const questRecord = questDbRes


    return (
        <Mountain questId={questRecord.id} characterId={questRecord.characterId} tasks={questRecord.tasks} />
    );
};

export default Quest;
