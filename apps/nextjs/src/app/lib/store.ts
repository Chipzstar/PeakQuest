import { atom } from 'jotai'
import type { GoalParams } from "@peakquest/db";

export interface GoalState extends GoalParams {
    oneGoal?: string
}

export const goalStateAtom = atom<Partial<GoalState>>({})
