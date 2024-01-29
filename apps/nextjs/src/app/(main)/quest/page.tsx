import React from 'react';
import {MONSTERS} from "~/app/utils";
import Monster from "~/app/components/Monster";

// TODO: Adapt Quest page to use canvas API using KonvaJS
const Quest = () => {
    return (
        <div className="h-screen relative bg-mountain-quest-mobile bg-cover md:bg-mountain-quest bg-[bottom_2rem_right_1rem] md:bg-center bg-no-repeat">
            {MONSTERS.map((monster, index) => (
                <Monster
                    key={index}
                    src={monster.image}
                    position={monster.position}
                    classNames={monster?.classNames}
                />
            ))}
        </div>
    );
};

export default Quest;
