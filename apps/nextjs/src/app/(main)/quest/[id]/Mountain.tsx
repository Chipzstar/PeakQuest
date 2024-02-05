"use client"

import React, { useState, useEffect, useCallback } from 'react';
import { MONSTERS } from "~/app/utils";
import { Tooltip, TooltipArrow, TooltipContent, TooltipProvider, TooltipTrigger } from "@peakquest/ui/tooltip";
import SelectPlayer from '~/components/SelectPlayer';
import { useAtom } from 'jotai'
import { selectedCharacterAtom } from '~/app/lib/store';
import { characters } from '~/components/SelectPlayer';
import { tasks } from "@peakquest/db"
import { Stage, Layer, Image } from 'react-konva';
import { Html } from "react-konva-utils";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader, DialogTitle
} from "@peakquest/ui/dialog";
import { Button } from "@peakquest/ui/button";
import { useList } from 'react-use';
import NextImage from 'next/image';


interface MountainParams {
	questId: string
	characterId: number | null
	tasks: typeof tasks.$inferSelect[]
}


const characterMap = new Map();

characters.forEach((x) => {
	characterMap.set(x.id, x)
})

const Mountain = (params: MountainParams) => {
	const hasNotSelectedCharacter = params.characterId == null
	const [showSelectCharacter, setShowSelectCharacter] = useState(hasNotSelectedCharacter)
	const [selectedCharacter, setSelectedCharacter] = useAtom(selectedCharacterAtom)
	const [backgroundImage, setBackgroundImage] = useState<HTMLImageElement | null>(null)
	const [monsterImages, { updateAt: setMonsterImage }] = useList<HTMLImageElement>(Array(12).fill(new window.Image()));
	const [imagePositions, setImagePositions] = useState<Record<"x" | "y", number>[]>([]);
	const [offsetWidths, setOffsetWidths] = useState<number[]>([])
	const [dialogOpen, { updateAt: toggleDialog }] = useList<boolean>(Array(12).fill(false));
	const [tooltipOpen, showTooltip] = useState<boolean>(false)

	const characterSrc = selectedCharacter?.src
	const characterWidth = selectedCharacter?.width
	const characterHeight = selectedCharacter?.height

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
	const calculateImagePositions = () => {
		// Calculate x and y positions based on the stageSize
		const newImagePositions = monsterImages.map((image, index) => {
			let offsetWidth = 650;
			let midWidth = stageSize.width / 2;
			let offsetHeight = 250;
			let mountainTop = 200;
			let posX = null;
			let posY = stageSize.height - offsetHeight - (index * 55)

			if (index % 2 === 0) {
				let distanceFromCenter = Math.abs(posY - mountainTop)
				posX = stageSize.width - offsetWidth - index * 20 - (index - Math.round(distanceFromCenter / 3));
			} else {
				posX = offsetWidth - 50 + (index * 15)
			}
			return ({
				x: posX,
				y: posY
				/*x: (stageSize.width / (index + 2)) * (index + 1), // Example calculation, adjust as needed
				y: (stageSize.height / (index + 2)) * (index + 1), // Example calculation, adjust as needed*/
			});
		});
		setImagePositions(prevState => newImagePositions);
	};

	useEffect(() => {
		calculateImagePositions();
	}, [monsterImages, stageSize]);

	useEffect(() => {
		if (!hasNotSelectedCharacter) {
			setSelectedCharacter(characterMap.get(params.characterId))
		}
		const background = new window.Image();
		background.src = '/images/mountain-quest.png';
		background.onload = () => setBackgroundImage(background);
		for (const [index, m] of MONSTERS.entries()) {
			let image = new window.Image()
			image.src = m.image;
			image.onload = () => setMonsterImage(index, image);
		}
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [])

	if (showSelectCharacter || (selectedCharacter == undefined)) {
		return <SelectPlayer questId={params.questId} setShowCharacter={setShowSelectCharacter}/>
	}

	const tasks = params.tasks
	return (
		<>
			<Stage width={stageSize.width} height={window.innerHeight}>
				<Layer>
					{backgroundImage &&
                        <Image image={backgroundImage} width={stageSize.width} height={stageSize.height}/>}
					{tasks.slice(0, 10).map((task, index) => {
						const monster = MONSTERS[index]!
						const monsterImage = monsterImages[index]!
						const monsterPosition = imagePositions[index]!

						return monsterPosition && (
							<>
								<Image
									image={monsterImage}
									width={100 - (index * 7)}
									height={100 - (index * 7)}
									x={monsterPosition.x}
									y={monsterPosition.y}
									onClick={() => toggleDialog(index, !dialogOpen[index])}
								/>
								<Html>
									<Dialog open={dialogOpen[index]}
											onOpenChange={(state) => toggleDialog(index, state)}>
										<DialogContent className="w-3/4 md:max-w-2xl">
											<DialogHeader>
												<div className="absolute right-4 top-4 w-40 h-40 z-0">
													<img src={monsterImage.src} alt="Monster" style={{
														width: "100%",
														height: "100%"
													}}/>
												</div>
												<DialogTitle>Defeat {monster.name}</DialogTitle>
											</DialogHeader>
											<div className="flex flex-col justify-center space-x-2 py-8 z-10">
												<p id="task-name"
												   className="md:text-3xl font-semibold mb-4 w-5/6">{task.name}</p>
												<p>{task.description}</p>
											</div>
											<DialogFooter className="justify-end">
												<DialogClose asChild>
													<Button type="button" variant="secondary"
															className="bg-button sm:px-10">
														Done
													</Button>
												</DialogClose>
											</DialogFooter>
										</DialogContent>
									</Dialog>
								</Html>
							</>
						)
					})}
					<Html divProps={{
						style: {
							position: 'absolute',
                            transform: 'translate(-50%, 320%)',
							left: "43%"
						}
					}}>
						<TooltipProvider delayDuration={200}>
							<Tooltip open={tooltipOpen} onOpenChange={(state) => showTooltip(state)}>
								<TooltipTrigger onClick={() => setShowSelectCharacter(true)}>
									<img
										src={characterSrc as string}
										alt="Character"
										width={characterWidth}
										height={characterHeight}
										style={{
											width: characterWidth as number / 3 ?? 100,
											height: characterHeight as number,
										}}
									/>
								</TooltipTrigger>
								<TooltipContent>
									<span>Change your Peak Quest Character</span>
									<TooltipArrow/>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</Html>
				</Layer>
			</Stage>
		</>
	)
	/*return (
		<div
			className="h-screen relative bg-mountain-quest-mobile bg-cover md:bg-mountain-quest bg-[bottom_2rem_right_1rem] md:bg-center bg-no-repeat">
			{tasks.map((task, index) => {
				const monster = MONSTERS[index]

				if (monster == undefined) return

				return <Monster
					taskName={task.name}
					taskDescription={task.description}
					key={index}
					stepNum={index}
					name={monster.name}
					src={monster.image}
					position={monster.position}
					classNames={monster?.classNames}
				/>
			})}
			<TooltipProvider delayDuration={200}>
				<Tooltip>
					<TooltipTrigger onClick={() => setShowSelectCharacter(true)} style={{
						position: 'absolute',
						width: characterWidth as number / 3 ?? 100,
						top: "87%",
						left: "43%"
					}}>
						<Image src={characterSrc as string} alt="Character" width={characterWidth} height={characterHeight} />
					</TooltipTrigger>
					<TooltipContent>
						<span>Change your Peak Quest Character</span>
						<TooltipArrow />
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</div>
	);*/
};

export default Mountain;
