"use client"

// import { api } from "~/trpc/server";
import {Button} from "@1goal/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { PATHS } from "./utils";

export default function HomePage() {
    const router = useRouter()
    // You can await this here if you don't want to show Suspense fallback below
    // const posts = api.post.all();

    return (
        <main className="page-container">
            <div className="flex flex-col items-center justify-center gap-4 space-y-8">
                <div className="pb-6">
                    <Image src="/images/hero.svg" alt="hero" width={400} height={350}/>
                </div>
                <h1 className="text-3xl text-primary sm:text-[5rem] font-bold">
                    PeakQuest
                </h1>
                <p className="text-3xl text-secondary">Life is a marathon, not a sprint</p>
                <Button size="lg" className="jumbo-button" onClick={() => router.push(PATHS.QUESTION_1)}>
                    <span className="text-white">Create your quest</span>
                </Button>
                <div className="w-full max-w-2xl overflow-y-scroll">
                </div>
            </div>
            <div className="absolute bottom-0 left-0">
                <Image src="/images/questions/mythical-animal-1.png" alt="mythical-beast-1" width={350} height={350}/>
            </div>
        </main>
    );
}
