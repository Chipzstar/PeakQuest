"use client"

import React from 'react';
import {Button} from "@1goal/ui/button";
import Image from "next/image";
import {Progress} from "@1goal/ui/progress";
import {Textarea} from "@1goal/ui/textarea";
import {useRouter} from 'next/navigation';
import {PATHS} from "~/app/utils";
import {useAtom} from 'jotai'
import {goalStateAtom} from '~/app/lib/store';
import {Form, FormControl, FormField, FormItem, FormMessage} from '@1goal/ui/form';
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import * as z from 'zod';

const FormSchema = z.object({
    oneGoal: z.string({required_error: "Please enter your One goal"}),
})

const Question1 = () => {
    const router = useRouter()
    const [goalState, setGoalState] = useAtom(goalStateAtom)

    const form = useForm<z.infer<typeof FormSchema>>({
        defaultValues: {
            oneGoal: "",
        },
        resolver: zodResolver(FormSchema),
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        setGoalState({...goalState, oneGoal: data.oneGoal})
        router.push(PATHS.QUESTION_2)
    }

    return (
        <main className="page-container">
            <div className="absolute left-0 top-0 p-4">
                <Image src="/images/logo-art.svg" alt="logo-art" width={500} height={500}/>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                      className="flex flex-col items-center justify-center gap-4 space-y-6 z-20">
                    <Progress value={20} className="sm:w-96 h-7 rounded-3xl mb-8"/>
                    <h1 className="text-xl sm:text-[3rem] font-bold">
                        {'What is your "ONE" goal?'}
                    </h1>
                    <FormField
                        control={form.control}
                        name="oneGoal"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        className="jumbo-textarea"
                                        rows={4}
                                        placeholder="Please be specific and clear"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" size="lg" className="jumbo-button">
                        <span className="text-white">Enter one goal</span>
                    </Button>
                    <span
                        className="self-start text-stone-500">{"💡 What's your main goal - fitness, skill, personal growth, or other?"}</span>
                </form>
            </Form>
            <div className="absolute bottom-0 right-0">
                <Image src="/images/questions/mythical-animal-2.png" alt="mythical-beast-1" width={400} height={350}/>
            </div>
        </main>
    );
};

export default Question1;
