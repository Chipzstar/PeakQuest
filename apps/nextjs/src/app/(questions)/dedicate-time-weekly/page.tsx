"use client"

import React from 'react';
import {Button} from "@peakquest/ui/button";
import NextImage from "next/image";
import {Progress} from "@peakquest/ui/progress";
import {useForm} from "react-hook-form"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@peakquest/ui/form";
import {zodResolver} from "@hookform/resolvers/zod"
import * as z from 'zod';
import {useRouter} from 'next/navigation';
import {Checkbox} from "@peakquest/ui/checkbox";
import {PATHS} from '~/app/utils';
import {useAtom} from 'jotai'
import {goalStateAtom} from '~/app/lib/store';
import LogoArt from '~/app/assets/images/logo-art.svg';
import MythicalBeast6 from '~/app/assets/images/questions/mythical-animal-6.png';
import type {StaticImport} from 'next/dist/shared/lib/get-img-props';

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
		setGoalState({...goalState, daysPerWeekAvailable: data.days.length})
		router.push(PATHS.CONFIRM)
	}

	return (
		<main className="page-container">
			<div className="flex self-start md:absolute left-0 top-0 p-4">
				<NextImage
					src={LogoArt as StaticImport}
					alt="hero"
					sizes="(max-width: 480px) 25vw, (max-width: 768px) 200vw, 150vw"
					style={{
						width: "100%",
						height: "auto",
						objectFit: "contain",
					}}
				/>
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}
					  className="flex flex-col items-center justify-center gap-4 space-y-6 lg:space-y-10 z-20 px-6 sm:w-2/3">
					<div className="flex flex-col space-y-2 items-center">
						<Progress value={100} className="w-2/3 md::w-96 md:h-7 rounded-3xl mb-8"/>
						<h1 className="question-title sm:leading-tight">
							How much time can you dedicate weekly to work towards this goal?
						</h1>
					</div>
					<FormField
						control={form.control}
						name="days"
						render={() => (
							<FormItem>
								<div className="flex flex-row space-x-4 md:space-x-10 lg:space-x-14">
									{days.map((item) => (
										<FormField
											key={item.value}
											control={form.control}
											name="days"
											render={({field}) => (
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
								<FormMessage/>
							</FormItem>
						)}
					/>
					<div className="flex flex-col items-center space-y-6">
						<Button type="submit" size="lg" className="jumbo-button">
							<span className="text-white font-bold">Enter commitment</span>
						</Button>
						<span
							className="question-hint">{"💡 How much time weekly can you dedicate? This ensures a manageable plan for you."}</span>
					</div>
				</form>
			</Form>
			<div className="absolute bottom-0 right-0">
				<NextImage
					src={MythicalBeast6}
					alt="mythical-beast-6"
					sizes="(max-width: 480px) 60vw, (max-width: 768px) 125vw, 175vw"
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
