"use client"

import React from 'react';
import {Button} from "@1goal/ui/button";
import Image from "next/image";
import {Progress} from "@1goal/ui/progress";
import {Textarea} from "@1goal/ui/textarea";
import { useRouter } from 'next/navigation';
import {PATHS} from "~/app/utils";

const Question1 = () => {
    const router = useRouter()
    return (
        <main className="page-container">
            <div className="absolute left-0 top-0 p-4">
                <Image src="/images/logo-art.svg" alt="logo-art" width={500} height={500}/>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 space-y-6 z-20">
                <Progress value={20} className="w-3/5 rounded-3xl mb-8"/>
                <h1 className="text-xl sm:text-[3rem] font-bold">
                    {'What is your "ONE" goal?'}
                </h1>
                <Textarea
                    className="shadow-xl rounded-xl w-full"
                    rows={4}
                    placeholder="Please be specific and clear"
                />
                <Button size="lg" className="jumbo-button" onClick={() => router.push(PATHS.QUESTION_2)}>
                    <span className="text-white">Enter one goal</span>
                </Button>
                <span className="self-start">{"💡 What's your main goal - fitness, skill, personal growth, or other?"}</span>
            </div>
            <div className="absolute bottom-0 right-0">
                <Image src="/images/mythical-animal-2.png" alt="mythical-beast-1" width={400} height={350}/>
            </div>
        </main>
    );
};

export default Question1;
