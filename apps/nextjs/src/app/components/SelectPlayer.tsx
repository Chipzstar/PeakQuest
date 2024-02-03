"use client"

import React, { useState } from 'react';
import Character from "~/app/components/Character";
import type { CharacterData } from "~/app/utils/types";
import { Button } from "@peakquest/ui/button";
import { updateCharacter } from '~/actions/update-character';
import { Loader2 } from 'lucide-react';
import { cn } from '@peakquest/ui';
import { useAtom } from 'jotai'
import { selectedCharacterAtom } from '../lib/store';

export const characters: CharacterData[] = [
    {
        id: 1,
        src: '/images/characters/character-1.svg',
        alt: 'character-1',
        width: 140,
        height: 200
    },
    {
        id: 2,
        src: '/images/characters/character-2.svg',
        alt: 'character-2',
        width: 150,
        height: 200
    },
    {
        id: 3,
        src: '/images/characters/character-3.svg',
        alt: 'character-3',
        width: 100,
        height: 200
    },
    {
        id: 4,
        src: '/images/characters/character-4.svg',
        alt: 'character-4',
        width: 200,
        height: 200
    },
    {
        id: 5,
        src: '/images/characters/character-5.svg',
        alt: 'character-5',
        width: 170,
        height: 200
    }
]

const SelectPlayer = ({ questId, setShowCharacter }: { questId: string; setShowCharacter: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [loading, setLoading] = useState(false);
    const [selectedCharacter, setSelectedCharacter] = useAtom(selectedCharacterAtom)


    async function clickHandler(character: CharacterData) {
        setLoading(true)
        // TODO: error handling
        await updateCharacter(questId, character.id)
        setSelectedCharacter(character)
        setShowCharacter(false)
    }

    return (
        <main className="page-container-scrollable py-10">
            <div className="flex flex-col grow w-full">
                <div className="flex flex-col grow justify-center items-center space-y-6 sm:space-y-8 text-center">
                    <h1 className="text-3xl sm:text-5xl text-primary lg:text-7xl font-bold">
                        Select your player
                    </h1>
                    <p className="sm:text-lg lg:text-2xl text-secondary"><span className="font-bold">Remember: </span>Life is a
                        marathon, not a sprint
                    </p>
                    {loading ? <div> <Loader2 className={cn("text-white w-64 h-64  animate-spin hidden", {
                        "block": loading,
                    })} /></div> : ""}
                </div>
                <section className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 place-items-center">
                    {characters.map((c, index) => (
                        <button key={index} onClick={() => clickHandler(c)}
                        >
                            <Character
                                id={c.id}

                                width={c.width}
                                height={c.height}
                                alt={c.alt}
                                src={c.src}
                            />
                        </button>
                    ))}
                </section>
                <footer className="pt-10 px-10 flex justify-end">
                    <Button onClick={() => setShowCharacter(false)} className="bg-button text-white w-32">Go Back</Button>
                </footer>
            </div>
        </main>
    );
};

export default SelectPlayer;
