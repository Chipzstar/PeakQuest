import React from 'react';
import { db, quest, tasks } from '@peakquest/db';
import { notFound } from "next/navigation";
import { eq, asc } from 'drizzle-orm';

import dynamic from "next/dynamic";

const NoSSRMountain = dynamic(() => import("./Mountain"), {
    ssr: false,
});


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

    if (questDbRes == undefined) notFound();

    const questRecord = questDbRes

    return (
        <NoSSRMountain
            questId={questRecord.id}
            characterId={questRecord.characterId}
            tasks={questRecord.tasks}
            currentTaskIndex={questRecord.currentTask}
            questCompleted={!!questRecord.isComplete}
        />
    );
};

export default Quest;
