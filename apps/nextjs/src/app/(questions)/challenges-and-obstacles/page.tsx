"use client"

import React from 'react';
import {Button} from "@1goal/ui/button";
import Image from "next/image";
import {Progress} from "@1goal/ui/progress";
import {Textarea} from "@1goal/ui/textarea";
import {toast} from '@1goal/ui/toast';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from 'zod';
import {Form, FormControl, FormField, FormItem, FormMessage} from "@1goal/ui/form";

const FormSchema = z.object({
    challenges: z
        .string()
        .min(10, {
            message: "Must be at least 5 characters.",
        })
        .max(160, {
            message: "Must not be longer than 30 characters.",
        }).optional(),
})

const Question4 = () => {
    // const router = useRouter()

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
    }


    return (
        <main className="page-container">
            <div className="absolute right-0 top-0 p-4">
                <Image src="/images/logo-art.svg" alt="logo-art" width={500} height={500}/>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center justify-center gap-4 space-y-10 z-20 sm:w-2/3">
                    <div className="flex flex-col items-center">
                        <Progress value={80} className="sm:w-96 h-7 rounded-3xl mb-8"/>
                        <h1 className="text-xl sm:text-5xl text-center font-bold sm:leading-tight">
                            Are there any specific challenges or obstacles you anticipate facing while pursuing this
                            goal?
                        </h1>
                    </div>
                    <FormField
                        control={form.control}
                        name="challenges"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea
                                        className="shadow-xl rounded-xl sm:w-160"
                                        rows={6}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" size="lg" className="jumbo-button">
                        <span className="text-white">Enter challenges</span>
                    </Button>
                    <span
                        className="text-stone-500">{"💡 What challenges do you expect? This shapes your checklist to overcome them."}</span>
                </form>
            </Form>
            <div className="absolute bottom-0 left-0">
                <Image src="/images/mythical-animal-5.png" alt="mythical-beast-1" width={400} height={350}/>
            </div>
        </main>
    );
};

export default Question4;
