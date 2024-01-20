import React, {Fragment} from 'react';
import {Button} from "@1goal/ui/button";
import Image from "next/image";

const Start = () => {
    return (
        <Fragment>
            <div className="gap-4 space-y-6">
                <Image src="/images/hero.svg" alt="hero" width={400} height={350}/>
                <h1 className="text-8xl text-primary sm:text-[5rem] font-bold">
                    OneGoal
                </h1>
                <p className="text-3xl text-secondary">Life is a marathon, not a sprint</p>
                <Button size="lg" className="rounded-3xl h-16 w-144 shadow-xl">
                    <span className="text-2xl">Create your one goal</span>
                </Button>
                <div className="w-full max-w-2xl overflow-y-scroll">
                </div>
            </div>
            <div className="absolute bottom-0 left-0">
                <Image src="/images/mythical-animal-1.png" alt="mythical-beast-1" width={500} height={500}/>
            </div>
        </Fragment>
    );
};

export default Start;
