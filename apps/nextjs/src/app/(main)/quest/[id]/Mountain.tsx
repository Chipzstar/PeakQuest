"use client"

import React, { useState, useEffect } from 'react';
import { MONSTERS, PATHS } from "~/app/utils";
import Monster from "~/app/components/Monster";
import { Tooltip, TooltipArrow, TooltipContent, TooltipProvider, TooltipTrigger } from "@peakquest/ui/tooltip";
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import SelectPlayer from '~/app/components/SelectPlayer';

interface MountainParams {
    questId?: string
    characterId?: number | null
}

// TODO: Adapt Quest page to use canvas API using KonvaJS
const Mountain = (params: MountainParams) => {
    const hasNotSelectedCharacter = params.characterId == null
    const [showSelectCharacter, setShowSelectCharacter] = useState(hasNotSelectedCharacter)
    const searchParams = useSearchParams()
    const characterSrc = searchParams.get("src") ?? "/images/characters/character-1.svg"
    const characterWidth = Number(searchParams.get("width") ?? 140)
    const characterHeight = Number(searchParams.get("height") ?? 200)


    if (showSelectCharacter) {
        return <SelectPlayer questId={params.questId as string} setShowCharacter={setShowSelectCharacter} />
    }

    return (
        <div
            className="h-screen relative bg-mountain-quest-mobile bg-cover md:bg-mountain-quest bg-[bottom_2rem_right_1rem] md:bg-center bg-no-repeat">
            {MONSTERS.map((monster, index) => (
                <Monster
                    key={index}
                    stepNum={index}
                    name={monster.name}
                    src={monster.image}
                    position={monster.position}
                    classNames={monster?.classNames}
                />
            ))}
            <TooltipProvider delayDuration={200}>
                <Tooltip>
                    <TooltipTrigger onClick={() => setShowSelectCharacter(true)} style={{
                        position: 'absolute',
                        width: characterWidth / 3 ?? 100,
                        top: "87%",
                        left: "43%"
                    }}>
                        <Image src={characterSrc} alt="Character" width={characterWidth} height={characterHeight} />
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
