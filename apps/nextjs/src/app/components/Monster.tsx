import { CSSProperties, FC, useMemo } from 'react';
import React from 'react';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription, DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@peakquest/ui/dialog";
import { Label } from "@peakquest/ui/label";
import { Input } from "@peakquest/ui/input";
import { Button } from "@peakquest/ui/button";
import { format, addMonths } from "date-fns";

interface Props {
	src: string;
	name: string;
	stepNum: number;
	position: {
		x: number | string;
		y: number | string;
	};
	size?: {
		width: number | string;
		height: number | string;
	}
	classNames?: string;
	taskName: string;
	taskDescription: string;
}

const Monster: FC<Props> = ({
	src,
	name,
	stepNum,
	position,
	size = { width: 100, height: 100 },
	classNames = "",
	taskName,
	taskDescription,
}: Props) => {

	const style: CSSProperties = {
		position: 'absolute',
		top: `${position.y}%`,
		left: `${position.x}%`,
		width: `${size.width}`,
		height: `${size.height}`
	};

	const dueDate = useMemo(() => {
		const nextDate = addMonths(new Date(), stepNum);
		return format(nextDate, 'do MMM yy');
	}, [stepNum])

	return (
		<Dialog>
			<DialogTrigger asChild role="button">
				<img src={src} alt="Monster" style={style} className={classNames} />
			</DialogTrigger>
			<DialogContent className="w-3/4 md:max-w-2xl">
				<DialogHeader>
					<div className="absolute right-4 top-4 w-40 h-40">
						<img src={src} alt="Monster" style={{
							width: "100%",
							height: "100%"
						}} />
					</div>
					<DialogTitle>Defeat {name}</DialogTitle>
					<DialogDescription>
						To be done by: {dueDate}
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col justify-center space-x-2 py-8">
					<p id="task-name" className="md:text-4xl font-semibold mb-4">{taskName}</p>
					<p>{taskDescription}</p>
				</div>
				<DialogFooter className="justify-end">
					<DialogClose asChild>
						<Button type="button" variant="secondary" className="bg-button px-10">
							Done
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default Monster;
