import { MonsterParams } from "~/app/utils";
import React from "react";
import { setCurrentTask, updateTask } from "~/actions/update-task";
import { toast } from "@peakquest/ui/toast";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@peakquest/ui/dialog";
import { Button } from "@peakquest/ui/button";
import { PrimitiveAtom, useAtom } from "jotai";
import { tasks } from "@peakquest/db";
import Lottie from "lottie-react";
import confetti from "~/app/assets/animations/confetti.json";

type Tasks = typeof tasks.$inferSelect[]

export function Monster(props: {
	dialogOpen: any,
	index: number,
	onOpenChange: (state: boolean) => void,
	monster: MonsterParams
	offsetY: number
	stageSize: { width: number; height: number },
	bgImageHeight: number,
	task: any
	tasksAtom: PrimitiveAtom<Tasks>
	setCharPosition: (i: number) => void;
}) {
	const {
		dialogOpen,
		index,
		onOpenChange,
		monster,
		offsetY,
		stageSize,
		bgImageHeight,
		task,
		tasksAtom,
		setCharPosition
	} = props;
	const [tasks, setTasks] = useAtom(tasksAtom)
	const transform = `translate(${(stageSize.width / 2) + monster.position.x!}px, ${bgImageHeight - monster.position.y! + offsetY}px)`
	const width = index >= 9 ? `${130 - (index * 10)}px` : `${130 - (index * 9)}px`
	const handleMouseEnter = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
		const target = event.target as HTMLImageElement
		target.style.transform = transform + 'scale(1.2)'; // Increase scale on mouse enter
		target.style.transition = 'transform 0.3s ease'; // Apply transition animation
	};

	const handleMouseLeave = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
		const target = event.target as HTMLImageElement
		target.style.transform = transform + 'scale(1)'; // Reset scale on mouse leave
	};

	async function toggleDone(id: number, value: boolean) {
		try {
			await updateTask(id, value)
			const index = await setCurrentTask(task.questId)
			setCharPosition(Number(index))

			const taskIndex = tasks.findIndex((x) => x.id == id)

			tasks[taskIndex]!.isComplete = value

			setTasks(tasks)
		} catch (err: any) {
			console.error(err)
			toast('Failed to update task', {
				description: err.message as string,
				duration: 3000
			})
		}
	}

	// If the current task is incomplete, check if the previous task is complete
	// If the current task is complete, check if the next task is complete
	// if either of the above are true, set the variable isDisabled to true
	let isDisabled: boolean, currAndNextTaskComplete: boolean = false, currAndPrevTaskIncomplete: boolean = false;
	if (task.isComplete) {
		currAndNextTaskComplete = tasks.length > index + 1 && !!tasks[index + 1]!.isComplete; // next task
	} else {
		currAndPrevTaskIncomplete = index > 0 ? !tasks[index - 1]!.isComplete : false; // previous task
	}
	isDisabled = currAndPrevTaskIncomplete || currAndNextTaskComplete;

	return (
		<>
			<div style={{
				zIndex: 50,
				position: 'absolute',
				width,
				transform
			}}>
				{task.isComplete && <Lottie animationData={confetti} loop={false}/>}
			</div>
			<Dialog open={dialogOpen[index]} onOpenChange={onOpenChange}>
				<DialogTrigger asChild role="button">
					<img
						src={task.isComplete ? "/images/flag.png" : monster.image}
						style={{
							width,
							transform,
						}}
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
					/>
				</DialogTrigger>
				<DialogContent className="md:max-w-2xl lg:max-w-3xl">
					<DialogHeader>
						<div className="absolute right-4 top-4 w-40 h-40 z-0">
							<img src={monster.image} alt="Monster" style={{
								width: "100%",
								height: "100%"
							}}/>
						</div>
						<DialogTitle className="text-2xl">Defeat {monster.name}</DialogTitle>
					</DialogHeader>
					<div className="flex flex-col justify-center space-x-2 py-8 z-10 w-3/4">
						{currAndNextTaskComplete ?
							<p>You already have a task ahead marked as complete. Mark that as incomplete first before
								this one</p> : currAndPrevTaskIncomplete ?
								<p>This task will be revealed once all previous tasks are complete</p> : (
									<>
										<p id="task-name" className="md:text-3xl font-semibold mb-4">{task.name}</p>
										<p>{task.description}</p>
									</>
								)}
					</div>
					<DialogFooter className="justify-end mt-5">
						<DialogClose asChild>
							<Button
								onClick={() => toggleDone(task.id, !task.isComplete)}
								disabled={isDisabled}
								type="button"
								variant="secondary"
								className="bg-button sm:px-10"
							>
								{task.isComplete ? "Mark incomplete" : "Done"}
							</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
