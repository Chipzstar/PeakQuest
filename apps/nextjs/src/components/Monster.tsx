import React, { CSSProperties, FC, useMemo } from 'react';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@peakquest/ui/dialog";
import { Button } from "@peakquest/ui/button";
import { addMonths, format } from "date-fns";
import { Image } from 'react-konva';

interface Props {
	image: HTMLImageElement
	src?: string;
	name: string;
	stepNum: number;
	x: number;
	y: number;
	size?: {
		width: number | string;
		height: number | string;
	}
	classNames?: string;
	taskName: string;
	taskDescription: string;
	handleImageClick: () => void;
}

const Monster: FC<Props> = ({
								image,
								src,
								name,
								stepNum,
								x,
								y,
								size = { width: 100, height: 100 },
								classNames = "",
								taskName,
								taskDescription,
								handleImageClick
							}: Props) => {

	/*const style: CSSProperties = {
		position: 'absolute',
		top: `${position.y}%`,
		left: `${position.x}%`,
		width: `${size.width}`,
		height: `${size.height}`
	};*/

	const dueDate = useMemo(() => {
		const nextDate = addMonths(new Date(), stepNum);
		return format(nextDate, 'do MMM yy');
	}, [stepNum])

	return (
		<Image
			image={image}
			width={40}
			height={40}
			x={x}
			y={y}
			onClick={handleImageClick}
		/>
	);
};

export default Monster;
