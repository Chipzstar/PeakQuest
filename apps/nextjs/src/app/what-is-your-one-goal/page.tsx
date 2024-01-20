import React from 'react';
import {Button} from "@1goal/ui/button";
import Image from "next/image";

const page = () => {
    return (
        <main className="flex items-center justify-center h-screen py-16">
            <div className="absolute left-0 top-0">
                <Image src="/images/logo-art.svg" alt="logo-art" width={500} height={500}/>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 space-y-6">
                <h1 className="text-xl text-primary sm:text-[3rem] font-bold">
                    What is your "ONE" goal?
                </h1>
                <p className="text-3xl text-secondary">Life is a marathon, not a sprint</p>
                <Button size="lg" className="rounded-3xl h-16 w-144 shadow-xl">
                    <span className="text-2xl">Create your one goal</span>
                </Button>
                <div className="w-full max-w-2xl overflow-y-scroll">
                </div>
            </div>
        </main>
    );
};

export default page;
