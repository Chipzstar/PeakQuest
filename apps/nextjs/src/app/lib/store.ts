import { atom } from 'jotai'
import type { GoalParams } from "@1goal/db";

export interface GoalState extends GoalParams {
    oneGoal?: string
}

export const goalStateAtom = atom<Partial<GoalState>>({})
