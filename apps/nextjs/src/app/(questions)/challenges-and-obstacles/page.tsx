"use client"

import React from 'react';
import { Button } from "@peakquest/ui/button";
import NextImage from "next/image";
import { Progress } from "@peakquest/ui/progress";
import { Textarea } from "@peakquest/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from "@peakquest/ui/form";
import { PATHS } from "~/app/utils";
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai'
import { goalStateAtom } from '~/app/lib/store';
import LogoArt from "~/app/assets/images/logo-art.svg";
import MythicalBeast5 from "~/app/assets/images/questions/mythical-animal-5.png";
import type { StaticImport } from 'next/dist/shared/lib/get-img-props';

const FormSchema = z.object({
	challenges: z.union([z
		.string()
		.min(5, {
			message: "Must be at least 5 characters.",
		}), z.literal("")
    ])
})

const Question4 = () => {
	const router = useRouter()
	const [goalState, setGoalState] = useAtom(goalStateAtom)


	const form = useForm<z.infer<typeof FormSchema>>({
		defaultValues: {
			challenges: "",
		},
		resolver: zodResolver(FormSchema),
	})

	function onSubmit(data: z.infer<typeof FormSchema>) {
		setGoalState({ ...goalState, challengesFaced: data.challenges })
		router.push(PATHS.QUESTION_5)
	}


	return (
		<main className="page-container">
			<div className="flex self-end md:absolute right-0 top-0 p-4">
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
					  className="flex flex-col items-center justify-center gap-4 space-y-6 lg:space-y-10 z-20 px-6">
					<div className="flex flex-col items-center">
						<Progress value={80} className="sm:w-96 md:h-7 rounded-3xl mb-8 w-2/3"/>
						<h1 className="question-title sm:leading-tight lg:w-5/6">
							Are there any specific challenges or obstacles you anticipate facing while pursuing this
							goal?
						</h1>
					</div>
					<FormField
						control={form.control}
						name="challenges"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Textarea
										className="jumbo-textarea"
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
						className="question-hint">{"💡 What challenges do you expect? This shapes your checklist to overcome them."}</span>
				</form>
			</Form>
			<div className="absolute bottom-0 left-0">
				<NextImage
					src={MythicalBeast5}
					alt="mythical-beast-5"
					sizes="(max-width: 480px) 40vw, (max-width: 768px) 90vw, 175vw"
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

export default Question4;
