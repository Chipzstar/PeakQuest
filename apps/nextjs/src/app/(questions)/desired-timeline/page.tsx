"use client"

import React from 'react';
import {Button} from "@1goal/ui/button";
import Image from "next/image";
import {Progress} from "@1goal/ui/progress";
import {useRouter} from 'next/navigation';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@1goal/ui/select";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import * as z from 'zod';
import {Form, FormControl, FormField, FormItem, FormMessage} from "@1goal/ui/form";
import { ChevronDown } from 'lucide-react';
import {PATHS} from "~/app/utils";

const FormSchema = z.object({
    timeline: z.enum(["1 month", "3 months", "6 months", "9 months", "12 months", "18 months", "2 years"]).default("1 month"),
})

const Question3 = () => {
    const router = useRouter()

    const form = useForm<z.infer<typeof FormSchema>>({
        defaultValues: {
            timeline: "1 month",
        },
        resolver: zodResolver(FormSchema),
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data)
        router.push(PATHS.QUESTION_4)
    }

    return (
        <main className="page-container">
            <div className="absolute left-0 top-0 p-4">
                <Image src="/images/logo-art.svg" alt="logo-art" width={500} height={500}/>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                      className="flex flex-col items-center justify-center gap-4 space-y-10 z-20 sm:w-2/3">
                    <div className="flex flex-col space-y-2 items-center">
                        <Progress value={60} className="sm:w-96 h-7 rounded-3xl mb-8"/>
                        <h1 className="text-2xl sm:text-5xl text-center font-bold sm:leading-tight">
                            What is your desired timeline for achieving this goal?
                        </h1>
                    </div>
                    <FormField
                        control={form.control}
                        name="timeline"
                        render={({field}) => (
                            <FormItem>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="w-[180px] jumbo-select-trigger" icon={<ChevronDown className="h-7 w-7 opacity-50" />}>
                                            <SelectValue placeholder="1 month"/>
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
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" size="lg" className="jumbo-button">
                        <span className="text-white">Enter timeline</span>
                    </Button>
                    <span
                        className="text-stone-500">{"💡 What's your timeline - short-term or long-term? This helps set realistic steps."}</span>
                </form>
            </Form>
            <div className="absolute bottom-0 right-0">
                <Image src="/images/mythical-animal-4.png" alt="mythical-beast-1" width={400} height={350}/>
            </div>
        </main>
    );
};

export default Question3;
