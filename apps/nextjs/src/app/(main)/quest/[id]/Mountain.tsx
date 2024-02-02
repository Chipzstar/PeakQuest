"use client"

import React from 'react';
import { MONSTERS, PATHS } from "~/app/utils";
import Monster from "~/app/components/Monster";
import { Tooltip, TooltipArrow, TooltipContent, TooltipProvider, TooltipTrigger } from "@peakquest/ui/tooltip";
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

// TODO: Adapt Quest page to use canvas API using KonvaJS
const Mountain = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const characterSrc = searchParams.get("src") ?? "/images/characters/character-1.svg"
    const characterWidth = Number(searchParams.get("width") ?? 140)
    const characterHeight = Number(searchParams.get("height") ?? 200)

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
                    <TooltipTrigger onClick={() => router.push(PATHS.SELECT_PLAYER)} style={{
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
