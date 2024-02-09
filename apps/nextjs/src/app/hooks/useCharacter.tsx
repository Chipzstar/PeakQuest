import { useEffect, useState } from "react";
import { useAtom } from "jotai";


export type Position = Record<"x" | "y", number>

export type SizeScaleFactor = Record<"width" | "height", number>

const characterPositionsAndSizes: (Position & SizeScaleFactor & {monsterYOffset: number})[] = [
	{
		monsterYOffset: 0,
		width: 0.5,
		height: 1,
		x: 180,
		y: 202
	},
	{
		monsterYOffset: 0,
		width: 0.5,
		height: 1,
		x: -100,
		y: 422
	},
	{
		monsterYOffset: 20,
		width: 0.4,
		height: 0.9,
		x: -20,
		y: 510
	},
	{
		monsterYOffset: 20,
		width: 0.4,
		height: 0.9,
		x: 20,
		y: 590
	},
	{
		monsterYOffset: 30,
		width: 0.35,
		height: 0.8,
		x: 50,
		y: 660
	},
	{
		monsterYOffset: 40,
		width: 0.35,
		height: 0.7,
		x: 50,
		y: 710
	},
	{
		monsterYOffset: 80,
		width: 0.35,
		height: 0.5,
		x: 50,
		y: 755
	},
	{
		monsterYOffset: 110,
		width: 0.6,
		height: 0.35,
		x: 55,
		y: 790
	},
	{
		monsterYOffset: 130,
		width: 0.3,
		height: 0.3,
		x: 40,
		y: 830
	},
	{
		monsterYOffset: 150,
		width: 0.55,
		height: 0.2,
		x: 40,
		y: 870
	},
	{
		monsterYOffset: 155,
		width: 0.3,
		height: 0.15,
		x: 45,
		y: 920
	},
	{
		monsterYOffset: 167,
		width: 0.3,
		height: 0.15,
		x: 40,
		y: 944
	},
	// MOUNTAIN TOP - WHEN ALL TASKS ARE COMPLETE
	{
		monsterYOffset: 170,
		width: 0.25,
		height: 0.1,
		x: 30,
		y: 970
	}
	// MOUNTAIN TOP - WHEN ALL TASKS ARE COMPLETE
]

export const useCharacter = (index = 0) => {
	const { x, y, width, height, monsterYOffset } = characterPositionsAndSizes[index]!

	const [currentStep, setCurrentStep] = useState<number>(index);
	const [currentPosition, setCurrentPosition] = useState<Position>({ x, y });
	const [currentScaleFactor, setCurrentScaleFactor] = useState<SizeScaleFactor>({ width, height });
	const [currMonsterYOffset, setCurrMonsterYOffset] = useState<number>(monsterYOffset);


	const setCharPosition = (index: number) => {
		if (index < 0 || index >= characterPositionsAndSizes.length) return;
		const { x, y, width, height, monsterYOffset } = characterPositionsAndSizes[index]!
		console.table({ index, x, y, width, height, monsterYOffset })
		setCurrentStep(index)
		setCurrentPosition({x, y})
		setCurrentScaleFactor({width, height})
		setCurrMonsterYOffset(monsterYOffset)
	}

	return {
		currentStep,
		charPosition: currentPosition,
		charScaleFactor: currentScaleFactor,
		monsterYOffset: currMonsterYOffset,
		setCharPosition
	}
}
