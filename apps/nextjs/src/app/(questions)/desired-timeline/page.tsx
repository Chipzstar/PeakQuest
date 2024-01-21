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
import {toast} from "@1goal/ui/toast";

const FormSchema = z.object({
    timeline: z.enum(["1 month", "3 months", "6 months", "9 months", "12 months", "18 months", "2 years"]),
})

const Question3 = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const router = useRouter()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast("You submitted the following values:", {
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
            ),
        })
        // router.push(PATHS.QUESTION_4)
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
                        <h1 className="text-xl sm:text-5xl text-center font-bold sm:leading-tight">
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
                                    <SelectContent className="jumbo-select">
                                        <SelectItem value="1 month">1 month</SelectItem>
                                        <SelectItem value="3 months">3 months</SelectItem>
                                        <SelectItem value="6 month">6 months</SelectItem>
                                        <SelectItem value="9 months">9 months</SelectItem>
                                        <SelectItem value="12 months">12 months</SelectItem>
                                        <SelectItem value="2 year">2 years</SelectItem>
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
                        className="text-center text-stone-500">{"💡 What's your timeline - short-term or long-term? This helps set realistic steps."}</span>
                </form>
            </Form>
            <div className="absolute bottom-0 right-0">
                <Image src="/images/mythical-animal-4.png" alt="mythical-beast-1" width={400} height={350}/>
            </div>
        </main>
    );
};

export default Question3;
