import type {FC} from "react";
import { useCallback} from "react";
import React from "react";
import Image from 'next/image';
import type {CharacterData} from "~/app/utils/types";
import { useRouter } from "next/navigation";
import { PATHS } from "../utils";


const Character: FC<CharacterData> = (props: CharacterData) => {
    const router = useRouter()

    const onSelectCharacter = useCallback((src: string) => {
        window.localStorage.setItem("character", src);
        router.push(`${PATHS.QUEST}?src=${src}&width=${props.width}&height=${props.height}`);
    }, [])

    return (
        <div
            role="button"
            className="flex flex-col items-center justify-center rounded-3xl hover:bg-yellow-200/45 py-10 sm:w-48"
            onClick={() => onSelectCharacter(props.src)}
        >
            <Image src={props.src} width={props.width} height={props.height} alt={props.alt}
                   className="object-fill"/>
        </div>
    )
}

export default Character;
