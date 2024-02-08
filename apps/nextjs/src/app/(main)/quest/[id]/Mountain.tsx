"use client"

import React, { useEffect, useRef, useState } from 'react';
import { MonsterParams, MONSTERS } from "~/app/utils";
import { Tooltip, TooltipArrow, TooltipContent, TooltipProvider, TooltipTrigger } from "@peakquest/ui/tooltip";
import SelectPlayer, { characters } from '~/components/SelectPlayer';
import { atom, useAtom } from 'jotai'
import { selectedCharacterAtom } from '~/app/lib/store';
import { tasks } from "@peakquest/db"
import { Image, Layer, Stage } from 'react-konva';
import { Html } from "react-konva-utils";
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
import { useList } from 'react-use';
import { Events, animateScroll as scroll } from 'react-scroll';
import Konva from 'konva';
import { setCurrentTask, updateTask } from '~/actions/update-task';
import type { PrimitiveAtom } from 'jotai';
import { Minus, Plus } from 'lucide-react';
import { toast } from "@peakquest/ui/toast";
import { useCharacterPosition } from "~/app/hooks/useCharacterPosition";

type Tasks = typeof tasks.$inferSelect[]

interface MountainParams {
	questId: string
	characterId: number | null
	tasks: Tasks
	currentTaskIndex: number
}

const characterMap = new Map();

characters.forEach((x) => {
	characterMap.set(x.id, x)
})

function Monster(props: {
	dialogOpen: any,
	index: number,
	onOpenChange: (state: boolean) => void,
	monster: MonsterParams
	stageSize: { width: number; height: number },
	bgImageHeight: number,
	task: any
	tasksAtom: PrimitiveAtom<Tasks>
	setCharPosition: (i: number) => void;

}) {
	const { dialogOpen, index, onOpenChange, monster, stageSize, bgImageHeight, task, tasksAtom, setCharPosition } = props;
	const [tasks, setTasks] = useAtom(tasksAtom)
	const transform = `translate(${(stageSize.width / 2) + monster.position.x!}px, ${bgImageHeight - monster.position.y!}px)`
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
			if (index) {
				setCharPosition(index)
			}
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

	let prevTaskComplete = index > 0 ? !!tasks[index - 1]!.isComplete : true
	let prevTaskIncomplete = !prevTaskComplete

	return (
		<Dialog open={dialogOpen[index]} onOpenChange={onOpenChange}>
			<DialogTrigger asChild role="button">
				<img
					src={task.isComplete ? "/images/flag.png" : monster.image}
					style={{
						width: `${130 - (index * 9)}px`,
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
					{prevTaskComplete ? (
						<>
							<p id="task-name" className="md:text-3xl font-semibold mb-4">{task.name}</p>
							<p>{task.description}</p>
						</>
					) : (
						<p>This task will be revealed once all previous tasks are complete</p>
					)}
				</div>
				<DialogFooter className="justify-end mt-5">
					<DialogClose asChild>
						<Button
							onClick={() => toggleDone(task.id, !task.isComplete)}
							disabled={prevTaskIncomplete}
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
	);
}

const Mountain = (params: MountainParams) => {
	const mobileView = window.innerWidth <= 480;
	const hasNotSelectedCharacter = params.characterId == null
	const tasksAtom = atom<Tasks>(params.tasks)

	const [tasks] = useAtom(tasksAtom)
	const [showSelectCharacter, setShowSelectCharacter] = useState(hasNotSelectedCharacter)
	const [selectedCharacter, setSelectedCharacter] = useAtom(selectedCharacterAtom)
	const [backgroundImage, setBackgroundImage] = useState<HTMLImageElement | null>(null)
	const [bgImageWidth, setBgImageWidth] = useState(0)
	const [scalingFactor, setScalingFactor] = useState({ x: mobileView ? 0.75 : 1, y: mobileView ? 0.75 : 1 })
	const [bgImageHeight, setBgImageHeight] = useState(0)
	const [dialogOpen, { updateAt: toggleDialog }] = useList<boolean>(Array(12).fill(false));
	const { charPosition, setCharPosition } = useCharacterPosition(params.currentTaskIndex)
	const stageRef = useRef<Konva.Stage>(null)
	const characterRef = useRef<HTMLImageElement>(null)
	const [stageSize, setStageSize] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	const handleResize = () => {
		setStageSize({
			width: window.innerWidth,
			height: window.innerHeight,
		});

	};

	const updateScale = (value: number) => {
		const stage = stageRef.current;
		let limitX = mobileView ? 0.5 : 0.75
		let limitY = mobileView ? 0.5 : 0.75
		if (stage == null) return;

		let newScaleX = Math.max(scalingFactor.x + value, limitX)
		let newScaleY = Math.max(scalingFactor.y + value, limitY)

		const stageWidth = stage.width();
		const stageHeight = stage.height();

		const x = (stageWidth / 2 - stageWidth / 2 * newScaleX)
		const y = (stageHeight / 2 - stageHeight / 2 * newScaleY)
		let newScale = { x: newScaleX, y: newScaleY }

		stage.position({ x, y });
		stage.scale(newScale);
		stage.batchDraw();

		setScalingFactor(newScale)
	}


	const characterSrc = selectedCharacter?.src
	const characterWidth = selectedCharacter?.width
	const characterHeight = selectedCharacter?.height

	const scrollToCharacter = () => {
		const character = characterRef.current!;
		// calculate new Y position to scroll to
		let newY = bgImageHeight - character.offsetTop
		// console.table({ bgImageHeight, newStagePos: stage.getPosition().y, newY })
		scroll.scrollTo(newY);
	};

	useEffect(() => {
		if (!hasNotSelectedCharacter) {
			setSelectedCharacter(characterMap.get(params.characterId))
		}
		const background = new window.Image();
		// window.innerWidth < 480 ? background.src = '/images/mountain-quest-mobile.png' : background.src = '/images/mountain-quest.png';
		background.src = '/images/mountain-quest.png';
		background.onload = () => {
			setBackgroundImage(background)
			setBgImageWidth(background.width)
			setBgImageHeight(background.height)
		};
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [])

	/*useEffect(() => {
		let stage = stageRef.current
		if (stage) {
			setTimeout(scrollToCharacter, 500)
			stage.on('scaleXChange', scrollToCharacter);
		}
		return () => {
			stage?.off('scaleXChange', scrollToCharacter);
		};
	}, [stageRef.current])*/

	if (showSelectCharacter || (selectedCharacter == undefined)) {
		return <SelectPlayer questId={params.questId} setShowCharacter={setShowSelectCharacter}/>
	}

	return (
		<div id="stage-wrapper" className='min-h-screen w-full'>
			<div className='fixed top-4 right-4 z-50 flex space-x-2'>
				<Button onClick={() => updateScale(0.25)} variant="outline" size="icon">
					<Plus className="h-4 w-4"/>
				</Button>
				<Button onClick={() => updateScale(-0.25)} variant="outline" size="icon">
					<Minus className="h-4 w-4"/>
				</Button>
			</div>
			<Stage
				id="stage"
				draggable={true}
				scale={{ x: scalingFactor.x, y: scalingFactor.y }}
				width={stageSize.width}
				height={bgImageHeight}
				ref={stageRef}
			>
				<Layer>
					{backgroundImage &&
                        <Image
                            offsetX={bgImageWidth / 2}
                            x={stageSize.width / 2}
                            image={backgroundImage}
                            width={bgImageWidth}
                            height={bgImageHeight}
                        />}
					<Html divProps={{
						style: { height: '100%' }
					}}>

						<TooltipProvider delayDuration={200}>
							<Tooltip>
								<TooltipTrigger onClick={() => setShowSelectCharacter(true)} style={{
									transform: `translate(${(stageSize.width / 2) - charPosition.x}px, ${bgImageHeight - charPosition.y}px)`,
									objectFit: 'contain'
								}}>
									<img
										ref={characterRef}
										src={characterSrc as string}
										alt="Character"
										width={characterWidth}
										height={characterHeight}
										style={{
											width: characterWidth as number / 2,
											height: characterHeight as number
										}}
									/>
								</TooltipTrigger>
								<TooltipContent sideOffset={-30}>
									<span>Change your Peak Quest Character</span>
									<TooltipArrow/>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
						{tasks.map((task, index) => {
							const m = MONSTERS[index]!
							return (
								<Monster
									key={index}
									dialogOpen={dialogOpen}
									index={index}
									onOpenChange={(state) => toggleDialog(index, state)}
									monster={m}
									stageSize={stageSize}
									bgImageHeight={bgImageHeight}
									task={task}
									tasksAtom={tasksAtom}
									setCharPosition={setCharPosition}
								/>
							)
						})}
					</Html>
				</Layer>
			</Stage>
		</div>
	)

};

export default Mountain;
