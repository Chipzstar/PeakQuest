import { atom } from 'jotai'
import type { GoalParams } from "@peakquest/db";
import { CharacterData } from '../utils/types';

export interface GoalState extends GoalParams {
    oneGoal?: string
}

export const goalStateAtom = atom<Partial<GoalState>>({})

export const selectedCharacterAtom = atom<CharacterData | undefined>(undefined)