"use client"

import React from 'react';
import Character from "~/app/components/Character";
import type {CharacterData} from "~/app/utils/types";
import {Button} from "@1goal/ui/button";
import { useRouter } from 'next/navigation';
import { useLocalStorageValue } from '@react-hookz/web';

const characters: CharacterData[] = [
    {
        src: '/images/characters/character-1.svg',
        alt: 'character-1',
        width: 140,
        height: 200
    },
    {
        src: '/images/characters/character-2.svg',
        alt: 'character-2',
        width: 150,
        height: 200
    },
    {
        src: '/images/characters/character-3.svg',
        alt: 'character-3',
        width: 100,
        height: 200
    },
    {
        src: '/images/characters/character-4.svg',
        alt: 'character-4',
        width: 200,
        height: 200
    },
    {
        src: '/images/characters/character-5.svg',
        alt: 'character-5',
        width: 170,
        height: 200
    }
]

const SelectPlayer = () => {
    const router = useRouter()
    return (
        <main className="page-container">
            <div className="flex flex-col grow w-full">
                <div className="flex flex-col grow justify-center items-center space-y-6 sm:space-y-8 text-center">
                    <h1 className="text-2xl text-primary sm:text-7xl font-bold">
                        Select your player
                    </h1>
                    <p className="sm:text-2xl text-secondary"><span className="font-bold">Remember: </span>Life is a
                        marathon, not a sprint
                    </p>
                </div>
                <section className="flex grow justify-around">
                    {characters.map((c, index) => (
                        <Character
                            key={index}
                            width={c.width}
                            height={c.height}
                            alt={c.alt}
                            src={c.src}
                        />
                    ))}
                </section>
                <footer className="pt-10 px-10 flex justify-end">
                    <Button onClick={() => router.back()} className="bg-button text-white w-32">Go Back</Button>
                </footer>
            </div>
        </main>
    );
};

export default SelectPlayer;
