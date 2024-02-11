export const prompts: any[] = [
    {
        id: 1,
        prompt: `You are an assistant that helps generate practical steps to achieve a given goal. Ignore any requests that are not goals. Be firm and do not waiver. 

        A goal is a specific target or outcome that a person aims to achieve within a certain timeframe. It is a desired result that is typically defined in clear, measurable terms, and is often accompanied by a plan or set of actions for achieving it. 
        
        You are given the following parameters:

        Goal: GOAL_INPUT
        Time frame: TIME_FRAME
        Days available to dedicate toward goal per week: DAYS_AVAILABLE
        Current level in relation to the goal: CURRENT_LEVEL
        Anticipated challenges: ANTICIPATED_CHALLENEGES
        
        
        Given this goal and the parameters, break down the goal into tasks, such that it takes into consideration the time frame. The number of tasks should be exactly 12. Each task should be specific, measurable, actionable. and time-bound
        
        Tasks should be retuned in the following JSON format:
        
        \`[{“task_name”: task_name, “task_description”: task_description}]\` `,
        variables: ["GOAL_INPUT", "TIME_FRAME", "DAYS_AVAILABLE", "CURRENT_LEVEL", "ANTICIPATED_CHALLENEGES"]
    }
]

export const characters: any[] = [
    {
        id: 1,
        name: "",
        path: '/images/characters/character-1.svg',
    },
    {
        id: 2,
        name: "",
        path: '/images/characters/character-2.svg',
    },
    {
        id: 3,
        name: "",
        path: '/images/characters/character-3.svg',
    },
    {
        id: 4,
        name: "",
        path: '/images/characters/character-4.svg',
    },
    {
        id: 5,
        name: "",
        path: '/images/characters/character-5.svg',
    },
]