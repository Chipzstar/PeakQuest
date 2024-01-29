import { atom } from 'jotai'
import type { GoalParams } from "node_modules/@1goal/db/src/schema/quest";

export type GoalState = GoalParams & {
    oneGoal?: string
}

export const goalStateAtom = atom<Partial<GoalState>>({})
