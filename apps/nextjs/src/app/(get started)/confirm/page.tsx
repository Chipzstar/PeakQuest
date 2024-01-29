"use client"

import React, {useEffect, useState } from 'react';
import {Button} from "@1goal/ui/button";
import {PATHS} from "~/app/utils";
import {useRouter} from 'next/navigation';
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@1goal/ui/form";
import {useForm} from "react-hook-form";
import {Input} from "@1goal/ui/input";
import { Loader2 } from 'lucide-react';
import { cn } from '@1goal/ui';
import {GettingStartedFormSchema} from "@1goal/validators";
import type {UserFormData} from "~/app/utils/types";

const Confirm = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const form = useForm<UserFormData>({
        resolver: zodResolver(GettingStartedFormSchema),
    })

    function onSubmit(data: UserFormData) {
        console.log(data)
        setLoading(true)
        setTimeout(() => {
            router.push(PATHS.INTRO)
            setLoading(false)
        }, 2000)
    }

    useEffect(() => {
        const storedValue = window.localStorage.getItem('user');
        if (storedValue) {
            try {
                const user = JSON.parse(window.localStorage.getItem('user')!) as UserFormData
                form.setValue('name', user.name, { shouldValidate: false });
                form.setValue('email', user.email, { shouldValidate: false });
            } catch (e) {
                console.log('Failed to parse stored value');
            }
        }
    }, []);

    // Callback version of watch.  It's your responsibility to unsubscribe when done.
    useEffect(() => {
        const subscription = form.watch((value, { name, type }) => {
            console.log(value, name, type)
            window.localStorage.setItem('user', JSON.stringify(value));
        })
        return () => subscription.unsubscribe();
    }, [form.watch])

    return (
        <main className="page-container bg-mythical-beast">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                      className="flex flex-col items-center justify-center gap-4 space-y-10">
                    <h1 className="text-3xl text-zinc-600 sm:text-[5rem] font-bold sm:mb-8">
                        Conquer your PEAK QUEST
                    </h1>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="First name" {...field} className="jumbo-input"/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Email Address" {...field} className="jumbo-input"/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" size="lg" className="jumbo-button" disabled={loading}>
                        <Loader2 className={cn("text-white mr-3 sm:h-12 sm:w-12 animate-spin hidden", {
                            "block": loading,
                        })} />
                        <span className="text-white">Get Started</span>
                    </Button>
                    <p className="text-4xl text-zinc-600 font-bold">Life is a marathon, not a sprint</p>
                </form>
            </Form>
        </main>
    );
};

export default Confirm;
