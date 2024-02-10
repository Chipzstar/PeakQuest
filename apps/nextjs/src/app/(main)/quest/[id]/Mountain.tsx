"use client"

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MONSTERS } from "~/app/utils";
import { Tooltip, TooltipArrow, TooltipContent, TooltipProvider, TooltipTrigger } from "@peakquest/ui/tooltip";
import SelectPlayer, { characters } from '~/components/SelectPlayer';
import { atom, useAtom } from 'jotai'
import { selectedCharacterAtom } from '~/app/lib/store';
import { tasks } from "@peakquest/db"
import { Group, Image, Layer, Stage } from 'react-konva';
import { Html, Portal } from "react-konva-utils";
import { useList } from 'react-use';
import { animateScroll as scroll } from 'react-scroll';
import Konva from 'konva';
import { useCharacter } from "~/app/hooks/useCharacter";
import { Monster } from "~/components/Monster";
import ZoomControls from "~/components/ZoomControls";
import fireworks from "~/app/assets/animations/fireworks.json";
import Lottie from 'lottie-react';
import QuestComplete from "~/components/QuestComplete";

type Tasks = typeof tasks.$inferSelect[]

interface MountainParams {
	questId: string
	characterId: number | null
	tasks: Tasks
	currentTaskIndex: number
	questCompleted: boolean
}

const characterMap = new Map();

characters.forEach((x) => {
	characterMap.set(x.id, x)
})

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
	const {
		charPosition,
		charScaleFactor,
		monsterYOffset,
		setCharPosition,
		currentStep
	} = useCharacter(params.currentTaskIndex)
	const stageRef = useRef<Konva.Stage>(null)
	const characterRef = useRef<HTMLImageElement>(null)
	const [stageSize, setStageSize] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});
	const [completeModal, setCompleteModal] = useState<boolean>(params.questCompleted)

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

	const scrollToCharacter = () => {
		// const character = characterRef.current!;
		// calculate new Y position to scroll to
		let newY = bgImageHeight - charPosition.y
		console.table({ bgImageHeight, newCharPos: charPosition.y,  newY })
		scroll.scrollTo(newY);
	};

	const characterSrc = selectedCharacter?.src
	const characterWidth = selectedCharacter?.width

	const characterHeight = selectedCharacter?.height

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

	useEffect(() => {
		let stage = stageRef.current
		if (stage) {
			setTimeout(scrollToCharacter, 500)
			stage.on('scaleXChange', scrollToCharacter);
		}
		return () => {
			stage?.off('scaleXChange', scrollToCharacter);
		};
	}, [stageRef.current])

	const isComplete = useMemo(() => {
		if (currentStep === 12) {
			setCompleteModal(true)
		}
		return params.questCompleted || currentStep === 12
	}, [currentStep, params.questCompleted])

	if (showSelectCharacter || (selectedCharacter == undefined)) {
		return <SelectPlayer questId={params.questId} setShowCharacter={setShowSelectCharacter}/>
	}

	return (
		<div id="stage-wrapper" className='min-h-screen w-full'>
			<ZoomControls
				zoomIn={() => updateScale(0.25)}
				zoomOut={() => updateScale(-0.25)}
			/>
			<Stage
				draggable={true}
				scale={{ x: scalingFactor.x, y: scalingFactor.y }}
				width={stageSize.width}
				height={bgImageHeight}
				ref={stageRef}
			>
				<Layer name="quest-stage">
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
						<QuestComplete open={!!stageRef.current && completeModal} onOpenChange={setCompleteModal}/>
						<div style={{
							position: 'absolute',
							zIndex: 50,
							transform: `translate(${stageSize.width / 2  - 85}px, ${bgImageHeight - charPosition.y - 50}px)`,
							width: '120%'
						}}>
							{isComplete && <Lottie animationData={fireworks} loop />}
						</div>
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
											width: characterWidth as number * charScaleFactor.width,
											height: characterHeight as number * charScaleFactor.height
										}}
									/>
								</TooltipTrigger>
								<TooltipContent sideOffset={-30 + (currentStep * 2)}>
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
									offsetY={monsterYOffset}
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
