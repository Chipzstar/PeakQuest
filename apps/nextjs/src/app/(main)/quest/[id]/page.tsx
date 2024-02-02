import React from 'react';
import Mountain from './Mountain';
import { db, quest } from '@peakquest/db';
import { notFound } from "next/navigation";
import { eq } from 'drizzle-orm';


const Quest = async ({ params }: { params: { id: string } }) => {
    const questId = params.id;

    const questDbRes = await db.select({ id: quest.id }).from(quest).where(eq(quest.id, questId))

    if (questDbRes.length == 0) {
        notFound();
    }

    return (
        <Mountain />
    );
};

export default Quest;
