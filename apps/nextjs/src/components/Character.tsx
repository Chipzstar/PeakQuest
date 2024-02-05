import React from "react";
import Image from 'next/image';
import type { CharacterData } from "~/app/utils/types";



const Character = (props: CharacterData) => {


	return (
		<div
			className="flex flex-col items-center justify-center rounded-3xl hover:bg-yellow-200/45 py-10 sm:w-48"
		>
			<Image src={props.src} width={props.width} height={props.height} alt={props.alt}
				className="object-fill" />
		</div>
	)
}

export default Character;
