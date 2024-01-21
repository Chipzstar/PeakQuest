"use client"

import React from 'react';
import {Button} from "@1goal/ui/button";
import Image from "next/image";
import {Progress} from "@1goal/ui/progress";
import {RadioGroup, RadioGroupItem} from "@1goal/ui/radio-group";
import {useForm} from "react-hook-form"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@1goal/ui/form";
import {zodResolver} from "@hookform/resolvers/zod"
import * as z from 'zod';
import {toast} from "@1goal/ui/toast";
import {Circle, Square} from 'lucide-react';
import { useRouter } from 'next/navigation';
import {PATHS} from "~/app/utils";

const FormSchema = z.object({
    level: z.enum(["beginner", "intermediate", "advanced"], {
        required_error: "You need to select a level.",
    }),
})

const Question2 = () => {
    const router = useRouter()
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        /*toast("You submitted the following values:", {
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
            ),
        })*/
        router.push(PATHS.QUESTION_3);
    }

    return (
        <main className="page-container">
            <div className="absolute right-0 top-0 p-4">
                <Image src="/images/logo-art.svg" alt="logo-art" width={500} height={500}/>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                      className="flex flex-col items-center justify-center gap-4 space-y-6 z-20 sm:w-2/3">
                    <div className="flex flex-col space-y-2 items-center">
                        <Progress value={40} className="sm:w-96 h-7 rounded-3xl mb-8"/>
                        <h1 className="text-xl sm:text-5xl text-center font-bold sm:leading-tight">
                            How would you select your current level in relation to your goal?
                        </h1>
                    </div>
                    <FormField
                        name="level"
                        control={form.control}
                        render={({field}) => (
                            <FormItem className="space-y-3">
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        className="flex justify-around space-x-32"
                                    >
                                        <FormItem className="flex flex-col items-center space-y-10">
                                            <FormControl>
                                                <RadioGroupItem
                                                    value="beginner"
                                                    id="beginner"
                                                    className="jumbo-radio"
                                                    indicator={<Square className="jumbo-radio-indicator"/>}
                                                />
                                            </FormControl>
                                            <FormLabel
                                                className="jumbo-radio-label"
                                            >
                                                Beginner
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex flex-col items-center space-y-10">
                                            <FormControl>
                                                <RadioGroupItem
                                                    value="intermediate"
                                                    id="intermediate"
                                                    className="jumbo-radio"
                                                    indicator={<Square className="jumbo-radio-indicator"/>}/>
                                            </FormControl>
                                            <FormLabel
                                                className="jumbo-radio-label"
                                            >
                                                Intermediate
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex flex-col items-center space-y-10">
                                            <FormControl>
                                                <RadioGroupItem
                                                    value="advanced"
                                                    id="advanced"
                                                    className="jumbo-radio"
                                                    indicator={<Square className="jumbo-radio-indicator"/>}/>
                                            </FormControl>
                                            <FormLabel
                                                className="jumbo-radio-label"
                                            >
                                                Advanced
                                            </FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" size="lg" className="jumbo-button">
                        <span className="text-white font-bold">Enter level</span>
                    </Button>
                    <span
                        className="text-stone-500">{"💡 Are you a beginner, intermediate, or advanced? This tailors your checklist."}</span>
                </form>
            </Form>
            <div className="absolute bottom-0 left-0">
                <Image src="/images/mythical-animal-3.png" alt="mythical-beast-1" width={350} height={350}/>
            </div>
        </main>
    );
};

export default Question2;
