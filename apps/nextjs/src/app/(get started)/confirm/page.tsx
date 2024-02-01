"use client"

import React, { useEffect, useState } from 'react';
import { Button } from "@peakquest/ui/button";
import { PATHS } from "~/app/utils";
import { useRouter } from 'next/navigation';
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@peakquest/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@peakquest/ui/input";
import { Loader2 } from 'lucide-react';
import { cn } from '@peakquest/ui';
import { GettingStartedFormSchema } from "@peakquest/validators";
import type { UserFormData } from "~/app/utils/types";
import { saveGoal } from '~/actions/save-goal';
import { useAtom } from 'jotai'
import type { GoalState } from '~/app/lib/store';
import { goalStateAtom } from '~/app/lib/store';
import { toast } from '@peakquest/ui/toast';

const Confirm = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const [goalState, setGoalState] = useAtom(goalStateAtom)

    const form = useForm<UserFormData>({
        resolver: zodResolver(GettingStartedFormSchema),
    })

    async function onSubmit(data: UserFormData) {
        setLoading(true)
        try {
            await saveGoal({ ...goalState as GoalState, name: data.name, email: data.email })
            router.push(PATHS.INTRO)
        } catch (err: any) {
            console.error(err)
            toast("Something went wrong. Please try again.", {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                description: err.message,
                duration: 3000
            })
        } finally {
            setLoading(false)
        }
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
        <main className="page-container justify-center bg-center bg-cover bg-no-repeat bg-mythical-beast">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col items-center justify-center gap-4 space-y-10">
                    <h1 className="text-4xl md:text-5xl lg:text-8xl text-zinc-600 text-center font-bold sm:mb-8">
                        Conquer your PEAK QUEST
                    </h1>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="First name" {...field} className="jumbo-input" />
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
                                    <Input placeholder="Email Address" {...field} className="jumbo-input" />
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
                    <p className="text-xl md:text-4xl text-zinc-600 font-bold">Life is a marathon, not a sprint</p>
                </form>
            </Form>
        </main>
    );
};

export default Confirm;
