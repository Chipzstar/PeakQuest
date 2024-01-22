"use client"

import React from 'react';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@1goal/ui/card";
import { useLocalStorageValue } from '@react-hookz/web';
import type {UserFormData} from "~/app/utils/types";
import { useClickAnyWhere } from "usehooks-ts";
import {useRouter} from 'next/navigation';
import {PATHS} from "~/app/utils";

const Intro = () => {
    const router = useRouter()
    const user = useLocalStorageValue<UserFormData>('user');

    useClickAnyWhere(() => {
        router.push(PATHS.QUEST)
    })

    return (
        <main className="page-container bg-mountain-watermark bg-center">
            <div className="sm:my-20 sm:w-3/5">
                <Card className="rounded-[50px] p-8">
                    <CardHeader>
                        <CardTitle>Hi {user.value?.name ?? "User"},</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{"Thank you for sharing your ONE GOAL with us. Understanding your ambition is crucial for us to provide tailored support as you navigate the challenges on your path to success."}</p>
                        <br/>
                        <p>{"We're excited to introduce you to our gamified app, inspired by fantasy world games and mountain climbing. This isn't just an app; it's a tool we've personally used to stay motivated and focused. The mountain theme symbolizes the peaks we all aim to conquer in our lives, with each step representing progress towards your goals."}</p>
                        <br/>
                        <p>{"We believe this app can offer you a new perspective on achieving your objectives, breaking them down into manageable milestones. Our commitment is to guide and support you throughout this journey."}</p>
                        <br/>
                        <p>{"We're looking forward to helping you conquer your mountains and celebrate every victory along the way. Let’s embark on this exciting journey together!"}</p>
                    </CardContent>
                    <CardFooter>
                        <span>Warm regards,<br/><span className="font-bold">PEAK QUEST TEAM</span></span>
                    </CardFooter>
                </Card>
            </div>
        </main>
    );
};

export default Intro;
