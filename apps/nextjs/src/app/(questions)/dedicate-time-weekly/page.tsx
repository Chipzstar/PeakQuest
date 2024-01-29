"use client"

import React from 'react';
import { Button } from "@1goal/ui/button";
import Image from "next/image";
import { Progress } from "@1goal/ui/progress";
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@1goal/ui/form";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { toast } from '@1goal/ui/toast';
import { Checkbox } from "@1goal/ui/checkbox";
import { PATHS } from '~/app/utils';
import { useAtom } from 'jotai'
import { goalStateAtom } from '~/app/lib/store';

const days = [
    {
        value: "monday",
        label: "Mon",
    },
    {
        value: "tuesday",
        label: "Tue",
    },
    {
        value: "wednesday",
        label: "Wed",
    },
    {
        value: "thursday",
        label: "Thu",
    },
    {
        value: "friday",
        label: "Fri",
    },
    {
        value: "saturday",
        label: "Sat",
    },
    {
        value: "sunday",
        label: "Sun",
    }
] as const

const FormSchema = z.object({
    days: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one item.",
    }),
})

const Question2 = () => {
    const router = useRouter()
    const [goalState, setGoalState] = useAtom(goalStateAtom)

    const form = useForm<z.infer<typeof FormSchema>>({
        defaultValues: {
            days: []
        },
        resolver: zodResolver(FormSchema)
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        setGoalState({ ...goalState, daysPerWeekAvailable: data.days.length })
        setTimeout(() => router.push(PATHS.CONFIRM), 2000)
    }

    return (
        <main className="page-container">
            <div className="absolute left-0 top-0 p-4">
                <Image src="/images/logo-art.svg" alt="logo-art" width={500} height={500} />
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col items-center justify-center gap-4 space-y-10 z-20 sm:w-2/3">
                    <div className="flex flex-col space-y-2 items-center">
                        <Progress value={100} className="sm:w-96 h-7 rounded-3xl mb-8" />
                        <h1 className="text-xl sm:text-5xl text-center font-bold sm:leading-tight">
                            How much time can you dedicate weekly to work towards this goal?
                        </h1>
                    </div>
                    <FormField
                        control={form.control}
                        name="days"
                        render={() => (
                            <FormItem>
                                <div className="flex flex-row sm:space-x-14">
                                    {days.map((item) => (
                                        <FormField
                                            key={item.value}
                                            control={form.control}
                                            name="days"
                                            render={({ field }) => (
                                                <FormItem
                                                    key={item.value}
                                                    className="flex flex-col items-center justify-center space-y-6"
                                                >
                                                    <FormControl>
                                                        <Checkbox
                                                            indicatorClassName="h-4 w-4 sm:h-6 sm:w-6"
                                                            className="jumbo-checkbox"
                                                            checked={field.value?.includes(item.value)}
                                                            onCheckedChange={(checked) => {
                                                                return checked
                                                                    ? field.onChange([...field.value, item.value])
                                                                    : field.onChange(
                                                                        field.value?.filter(
                                                                            (value) => value !== item.value
                                                                        )
                                                                    )
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="text-secondary">
                                                        {item.label}
                                                    </FormLabel>
                                                </FormItem>
                                            )}
                                        />
                                    ))}
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" size="lg" className="jumbo-button">
                        <span className="text-white font-bold">Enter commitment</span>
                    </Button>
                    <span
                        className="text-stone-500">{"💡 How much time weekly can you dedicate? This ensures a manageable plan for you."}</span>
                </form>
            </Form>
            <div className="absolute bottom-0 right-0">
                <Image src="/images/questions/mythical-animal-6.png" alt="mythical-beast-1" width={450} height={350} />
            </div>
        </main>
    );
};

export default Question2;
