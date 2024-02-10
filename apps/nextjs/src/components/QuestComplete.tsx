import React, { FC } from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@peakquest/ui/dialog";

interface Props {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

const QuestComplete: FC<Props> = ({ open, onOpenChange }) => {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="text-2xl">Congratulations 🎉</DialogTitle>
					<DialogDescription className="leading-relaxed text-base">
						You have completed your Peak Quest!
						<br/>
						This is a huge milestone in your journey.
						Your persistent efforts and dedication bore fruits today.
						Embrace this achievement and let it be a guiding light for the challenges to come.
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export default QuestComplete;
