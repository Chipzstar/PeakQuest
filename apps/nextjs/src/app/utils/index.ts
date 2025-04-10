export const COMPLETE_INDEX = 12
export const PATHS = {
    HOME: '/',
    QUESTION_1: '/what-is-your-one-goal',
    QUESTION_2: '/current-level',
    QUESTION_3: '/desired-timeline',
    QUESTION_4: '/challenges-and-obstacles',
    QUESTION_5: '/dedicate-time-weekly',
    CONFIRM: '/confirm',
    QUEST: '/quest'
}

export interface MonsterParams {
    name: string;
    image: string;
    position: {
        x: number;
        y: number;
    };
    classNames?: string;
}

export const MONSTERS: MonsterParams[] = [
    {
        name: 'Aetherscale Wyrmfire',
        image: '/images/monsters/Aetherscale Wyrmfire.png',
        position: { x: 200, y: 500 },
        classNames: 'h-32 w-32'
    },
    {
        name: 'Celestialflare Ignistris',
        image: '/images/monsters/Celestialflare Ignistris.png',
        position: { x: -150, y: 750 },
        classNames: 'h-32 w-32'
    },
    {
        name: 'Shadowmaw',
        image: '/images/monsters/Shadowmaw.png',
        position: { x: 100, y: 950 },
    },
    {
        name: 'Stormscale Draconith',
        image: '/images/monsters/Stormscale Draconith.png',
        position: { x: -200, y: 1140 },
        classNames: 'h-20 w-20'
    },
    {
        name: 'Obsidianfang Talondrake',
        image: '/images/monsters/Obsidianfang Talondrake.png',
        position: { x: 39, y: 1320 },
        classNames: 'h-20 w-20'
    },
    {
        name: 'Tremorhide',
        image: '/images/monsters/Tremorhide.png',
        position: { x: -140, y: 1460 },
        classNames: 'h-14 w-14'
    },
    {
        name: 'Mystwind',
        image: '/images/monsters/Mystwind.png',
        position: { x: 12, y: 1590 },
        classNames: 'h-12 w-12'
    },
    {
        name: 'Emberclaw Seraphion',
        image: '/images/monsters/Emberclaw Seraphion.png',
        position: { x: -89, y: 1720 },
        classNames: 'h-10 w-10'
    },
    {
        name: 'Flarefang',
        image: '/images/monsters/Flarefang.png',
        position: { x: 2, y: 1840 },
    },
    {
        name: 'Cragclaw',
        image: '/images/monsters/Cragclaw.png',
        position: { x: -55, y: 1940 },
    },
    {
        name: 'Drakonirion Thunderwing',
        image: '/images/monsters/Drakonirion Thunderwing.png',
        position: { x: -15, y: 2015 },
        classNames: 'h-24 w-24'
    },
    {
        name: 'Whisperwing',
        image: '/images/monsters/Whisperwing.png',
        position: { x: -37, y: 2065 },
        classNames: 'h-20 w-20'
    },
]
