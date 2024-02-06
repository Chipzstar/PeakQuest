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
import useImage from 'use-image';


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
	const [imageWidth, setImageWidth] = useState(0)
	const [imageHeight, setImageHeight] = useState(0)

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



	useEffect(() => {
		if (!hasNotSelectedCharacter) {
			setSelectedCharacter(characterMap.get(params.characterId))
		}
		const background = new window.Image();
		background.src = '/images/mountain-quest.png';
		background.onload = () => {
			setBackgroundImage(background)
			setImageWidth(background.width)
			setImageHeight(background.height)
		};

		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [])

	if (showSelectCharacter || (selectedCharacter == undefined)) {
		return <SelectPlayer questId={params.questId} setShowCharacter={setShowSelectCharacter} />
	}

	const tasks = params.tasks
	return (
		<div className='w-full'>
			<Stage width={stageSize.width} height={window.innerHeight}>
				<Layer>
					{backgroundImage &&
						<Image offsetX={imageWidth / 2} x={stageSize.width / 2} image={backgroundImage} width={imageWidth} height={imageHeight} />}
					<Html>
						<img
							src={MONSTERS[0]?.image}
							style={{
								width: "120px",
								transform: `translate(${(stageSize.width / 2) + MONSTERS[0]?.position.x!}px, ${imageHeight - MONSTERS[0]?.position.y!}px)`,
							}}
						/>
						<img
							src={MONSTERS[1]?.image}
							style={{
								width: "120px",
								transform: `translate(${(stageSize.width / 2) + MONSTERS[1]?.position.x!}px, ${imageHeight - MONSTERS[1]?.position.y!}px)`,
							}}
						/>
					</Html>

				</Layer>
			</Stage>
		</div>
	)

};

export default Mountain;
