"use client"

import React from 'react';
import {Button} from "@peakquest/ui/button";
import NextImage from "next/image";
import {Progress} from "@peakquest/ui/progress";
import {RadioGroup, RadioGroupItem} from "@peakquest/ui/radio-group";
import {useForm} from "react-hook-form"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@peakquest/ui/form";
import {zodResolver} from "@hookform/resolvers/zod"
import * as z from 'zod';
import {useRouter} from 'next/navigation';
import {PATHS} from "~/app/utils";
import {Square} from 'lucide-react';
import {useAtom} from 'jotai'
import {goalStateAtom} from '~/app/lib/store';
import LogoArt from "~/app/assets/images/logo-art.svg";
import type {StaticImport} from 'next/dist/shared/lib/get-img-props';
import MythicalBeast3 from "~/app/assets/images/questions/mythical-animal-3.png";


const FormSchema = z.object({
	level: z.enum(["beginner", "intermediate", "advanced"], {
		required_error: "You need to select a level.",
	}),
})

const Question2 = () => {
	const router = useRouter()
	const [goalState, setGoalState] = useAtom(goalStateAtom)

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
	})

	function onSubmit(data: z.infer<typeof FormSchema>) {
		setGoalState({...goalState, currentLevel: data.level})
		router.push(PATHS.QUESTION_3);
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
					  className="flex flex-col items-center justify-center gap-4 space-y-6 z-20 px-6">
					<div className="flex flex-col space-y-2 items-center">
						<Progress value={40} className="w-2/3 md:w-96 md:h-7 rounded-3xl mb-8"/>
						<h1 className="question-title sm:leading-normal lg:leading-tight">
							What is your current skill level?
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
										className="flex justify-around space-x-6 md:space-x-20 lg:space-x-32"
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
					<div className="flex flex-col items-center space-y-6">
						<Button type="submit" size="lg" className="jumbo-button">
							<span className="text-white font-bold">Enter level</span>
						</Button>
						<span
							className="text-center md:text-start text-stone-500">{"💡 Are you a beginner, intermediate, or advanced? This tailors your checklist."}</span>
					</div>
				</form>
			</Form>
			<div className="absolute bottom-0 left-0">
				<NextImage
					src={MythicalBeast3}
					alt="mythical-beast-3"
					sizes="(max-width: 480px) 75vw, (max-width: 768px) 100vw, 200vw"
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

export default Question2;
