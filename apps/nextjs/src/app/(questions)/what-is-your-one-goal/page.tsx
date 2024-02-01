"use client"

import React from 'react';
import {Button} from "@peakquest/ui/button";
import NextImage from "next/image";
import {Progress} from "@peakquest/ui/progress";
import {Textarea} from "@peakquest/ui/textarea";
import {useRouter} from 'next/navigation';
import {PATHS} from "~/app/utils";
import {useAtom} from 'jotai'
import {goalStateAtom} from '~/app/lib/store';
import {Form, FormControl, FormField, FormItem, FormMessage} from '@peakquest/ui/form';
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import * as z from 'zod';
import MythicalBeast2 from "~/app/assets/images/questions/mythical-animal-2.png";
import LogoArt from "~/app/assets/images/logo-art.svg";
import type {StaticImport} from 'next/dist/shared/lib/get-img-props';
import {notEmpty} from "@peakquest/validators";

const FormSchema = z.object({
	oneGoal: z
		.string({required_error: "Please enter your One goal"})
		.pipe(notEmpty("Please enter your One goal")),
})

const Question1 = () => {
	const router = useRouter()
	const [goalState, setGoalState] = useAtom(goalStateAtom)

	const form = useForm<z.infer<typeof FormSchema>>({
		defaultValues: {
			oneGoal: undefined,
		},
		resolver: zodResolver(FormSchema),
	})

	function onSubmit(data: z.infer<typeof FormSchema>) {
		setGoalState({...goalState, oneGoal: data.oneGoal})
		router.push(PATHS.QUESTION_2)
	}

	return (
		<main className="page-container">
			<div className="flex self-start md:absolute left-0 top-0 p-4">
				<NextImage
					src={LogoArt as StaticImport}
					alt="hero"
					sizes="(max-width: 480px) 20vw, (max-width: 768px) 200vw, 200vw"
					style={{
						width: "100%",
						height: "auto",
						objectFit: "contain",
					}}
				/>
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}
					  className="flex flex-col items-center justify-center gap-4 space-y-6 z-20 px-6">
					<Progress value={20} className="w-2/3 md:w-96 md:h-7 rounded-3xl md:mb-8"/>
					<h1 className="question-title">
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
								<FormMessage/>
							</FormItem>
						)}
					/>
					<div className="flex flex-col items-center space-y-6">
						<Button type="submit" size="lg" className="jumbo-button">
							<span className="text-white">Enter one goal</span>
						</Button>
						<span
							className="self-start">{"💡 What's your main goal - fitness, skill, personal growth, or other?"}</span>
					</div>
				</form>
			</Form>
			<div className="absolute bottom-0 right-0">
				<NextImage
					src={MythicalBeast2}
					alt="mythical-beast-2"
					sizes="(max-width: 480px) 75vw, (max-width: 768px) 150vw, 200vw"
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

export default Question1;
