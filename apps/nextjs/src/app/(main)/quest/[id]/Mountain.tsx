"use client"

import React, { useState, useEffect } from 'react';
import { MONSTERS } from "~/app/utils";
import Monster from "~/app/components/Monster";
import { Tooltip, TooltipArrow, TooltipContent, TooltipProvider, TooltipTrigger } from "@peakquest/ui/tooltip";
import Image from 'next/image';
import SelectPlayer from '~/app/components/SelectPlayer';
import { useAtom } from 'jotai'
import { selectedCharacterAtom } from '~/app/lib/store';
import { characters } from '~/app/components/SelectPlayer';
import { tasks } from "@peakquest/db"


interface MountainParams {
    questId: string
    characterId: number | null
    tasks: typeof tasks.$inferSelect[]
}

const characterMap = new Map();

characters.forEach((x) => {
    characterMap.set(x.id, x)
})

// TODO: Adapt Quest page to use canvas API using KonvaJS
const Mountain = (params: MountainParams) => {
    const hasNotSelectedCharacter = params.characterId == null
    const [showSelectCharacter, setShowSelectCharacter] = useState(hasNotSelectedCharacter)
    const [selectedCharacter, setSelectedCharacter] = useAtom(selectedCharacterAtom)

    useEffect(() => {
        if (!hasNotSelectedCharacter) {
            setSelectedCharacter(characterMap.get(params.characterId))
        }
    }, [])

    const characterSrc = selectedCharacter?.src
    const characterWidth = selectedCharacter?.width
    const characterHeight = selectedCharacter?.height


    if (showSelectCharacter || (selectedCharacter == undefined)) {
        return <SelectPlayer questId={params.questId} setShowCharacter={setShowSelectCharacter} />
    }

    const tasks = params.tasks

    return (
        <div
            className="h-screen relative bg-mountain-quest-mobile bg-cover md:bg-mountain-quest bg-[bottom_2rem_right_1rem] md:bg-center bg-no-repeat">
            {tasks.map((task, index) => {
                const monster = MONSTERS[index]

                if (monster == undefined) return

                return <Monster
                    taskName={task.name}
                    taskDescription={task.description}
                    key={index}
                    stepNum={index}
                    name={monster.name}
                    src={monster.image}
                    position={monster.position}
                    classNames={monster?.classNames}
                />
            })}
            <TooltipProvider delayDuration={200}>
                <Tooltip>
                    <TooltipTrigger onClick={() => setShowSelectCharacter(true)} style={{
                        position: 'absolute',
                        width: characterWidth as number / 3 ?? 100,
                        top: "87%",
                        left: "43%"
                    }}>
                        <Image src={characterSrc as string} alt="Character" width={characterWidth} height={characterHeight} />
                    </TooltipTrigger>
                    <TooltipContent>
                        <span>Change your Peak Quest Character</span>
                        <TooltipArrow />
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
};

export default Mountain;
