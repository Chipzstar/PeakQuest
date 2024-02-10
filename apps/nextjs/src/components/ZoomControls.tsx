import React from 'react';
import { Button } from "@peakquest/ui/button";
import { Minus, Plus } from 'lucide-react';

function ZoomControls(props: { zoomIn: () => void, zoomOut: () => void }) {
	return <div className="fixed top-4 right-4 z-50 flex space-x-2">
		<Button onClick={props.zoomIn} variant="outline" size="icon">
			<Plus className="h-4 w-4"/>
		</Button>
		<Button onClick={props.zoomOut} variant="outline" size="icon">
			<Minus className="h-4 w-4"/>
		</Button>
	</div>;
}

export default ZoomControls;

