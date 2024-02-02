"use client"

import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@peakquest/ui/card";
import { useLocalStorageValue } from '@react-hookz/web';
import type { UserFormData } from "~/app/utils/types";
import { useRouter } from 'next/navigation';
import { PATHS } from "~/app/utils";
import { ScrollArea } from "@peakquest/ui/scroll-area";
import { Button } from '@peakquest/ui/button';

const Intro = ({ name, questId }: { name: string, questId: string }) => {
    const router = useRouter()

    return (
        <main className="page-container bg-mountain-watermark bg-center justify-center">
            <div className="md:my-20 md:w-3/5 px-6 py-10 md:p-0">
                <Card className="rounded-[50px] p-8">
                    <ScrollArea className="h-160 max-h-160 md:h-full">
                        <CardHeader>
                            <CardTitle>Hi {name ?? "User"},</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{"Thank you for sharing your ONE GOAL with us. Understanding your ambition is crucial for us to provide tailored support as you navigate the challenges on your path to success."}</p>
                            <br />
                            <p>{"We're excited to introduce you to our gamified app, inspired by fantasy world games and mountain climbing. This isn't just an app; it's a tool we've personally used to stay motivated and focused. The mountain theme symbolizes the peaks we all aim to conquer in our lives, with each step representing progress towards your goals."}</p>
                            <br />
                            <p>{"We believe this app can offer you a new perspective on achieving your objectives, breaking them down into manageable milestones. Our commitment is to guide and support you throughout this journey."}</p>
                            <br />
                            <p>{"We're looking forward to helping you conquer your mountains and celebrate every victory along the way. Let's embark on this exciting journey together!"}</p>
                        </CardContent>
                        <CardFooter>
                            <span>Warm regards,<br /><span className="font-bold">PEAK QUEST TEAM</span></span>

                        </CardFooter>
                        <div className='p-6'>
                            <Button onClick={() => router.push(`${PATHS.QUEST}/${questId}`)} className="bg-button text-white w-32">Embark</Button>
                        </div>
                    </ScrollArea>
                </Card>
            </div>
        </main>
    );
};

export default Intro;
