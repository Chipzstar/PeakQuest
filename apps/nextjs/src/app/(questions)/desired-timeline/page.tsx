"use client"

import React from 'react';
import { Button } from "@peakquest/ui/button";
import NextImage from "next/image";
import { Progress } from "@peakquest/ui/progress";
import { useRouter } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@peakquest/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from "@peakquest/ui/form";
import { ChevronDown } from 'lucide-react';
import { PATHS } from "~/app/utils";
import { useAtom } from 'jotai'
import { goalStateAtom } from '~/app/lib/store';
import type { StaticImport } from 'next/dist/shared/lib/get-img-props';
import LogoArt from "~/app/assets/images/logo-art.svg";
import MythicalBeast4 from "~/app/assets/images/questions/mythical-animal-4.png";


const FormSchema = z.object({
    timeline: z.enum(["1 month", "3 months", "6 months", "9 months", "12 months", "18 months", "2 years"]).default("1 month"),
})

const Question3 = () => {
    const router = useRouter()
    const [goalState, setGoalState] = useAtom(goalStateAtom)


    const form = useForm<z.infer<typeof FormSchema>>({
        defaultValues: {
            timeline: "1 month",
        },
        resolver: zodResolver(FormSchema),
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        setGoalState({ ...goalState, timeline: data.timeline })
        router.push(PATHS.QUESTION_4)
    }

    return (
        <main className="page-container">
            <div className="flex self-start md:absolute left-0 top-0 p-4">
                <NextImage
                    src={LogoArt as StaticImport}
                    alt="hero"
                    sizes="(max-width: 480px) 20vw, (max-width: 768px) 200vw, 150vw"
                    style={{
                        width: "100%",
                        height: "auto",
                        objectFit: "contain",
                    }}
                />
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col items-center justify-center gap-4 space-y-10 z-20 px-6">
                    <div className="flex flex-col space-y-2 items-center">
                        <Progress value={60} className="w-2/3 sm:w-96 sm:h-7 rounded-3xl mb-8" />
                        <h1 className="question-title sm:leading-tight lg:w-2/3">
                            What is your desired timeline for achieving this goal?
                        </h1>
                    </div>
                    <FormField
                        control={form.control}
                        name="timeline"
                        render={({ field }) => (
                            <FormItem>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="jumbo-select-trigger" icon={<ChevronDown className="h-7 w-7 opacity-50" />}>
                                            <SelectValue placeholder="1 month" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="jumbo-select-content">
                                        <SelectItem value="1 month">1 month</SelectItem>
                                        <SelectItem value="3 months">3 months</SelectItem>
                                        <SelectItem value="6 months">6 months</SelectItem>
                                        <SelectItem value="9 months">9 months</SelectItem>
                                        <SelectItem value="12 months">12 months</SelectItem>
                                        <SelectItem value="2 years">2 years</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" size="lg" className="jumbo-button">
                        <span className="text-white">Enter timeline</span>
                    </Button>
                    <span
                        className="question-hint">{"💡 What's your timeline - short-term or long-term? This helps set realistic steps."}</span>
                </form>
            </Form>
            <div className="absolute bottom-0 right-0">
                <NextImage
                    src={MythicalBeast4}
                    alt="mythical-beast-4"
                    sizes="(max-width: 480px) 60vw, (max-width: 768px) 125vw, 175vw"
                    style={{
                        width: "100%",
                        height: "auto",
                        objectFit: "contain",
                    }}
                />
            </div>
        </main>
    );
};

export default Question3;
