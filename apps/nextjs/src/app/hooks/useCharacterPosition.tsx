import { useEffect, useState } from "react";
import { useAtom } from "jotai";


export type Position = Record<"x" | "y", number>

const characterPositions: Position[] = [
	{
		x: 180,
		y: 202
	},
	{
		x: -100,
		y: 422
	},
	{
		x: -20,
		y: 510
	},
	{
		x: 20,
		y: 610
	},
	{
		x: 50,
		y: 695
	},
	{
		x: 50,
		y: 760
	},
	{
		x: 65,
		y: 822
	},
	{
		x: 55,
		y: 880
	},
	{
		x: 40,
		y: 930
	},
	{
		x: 40,
		y: 990
	},
	{
		x: 60,
		y: 1030
	},
	{
		x: 70,
		y: 1080
	},
	{
		x: 70,
		y: 1100
	}
]

export const useCharacterPosition = (index = 0) => {
	const pos = characterPositions[index]!
	const [currentPosition, setCurrentPosition] = useState<Position>(pos);


	const setCharPosition = (index: number) => {
		if (index < 0 || index >= characterPositions.length) return;
		setCurrentPosition(characterPositions[index]!)
	}

	return { charPosition: currentPosition, setCharPosition }
}
