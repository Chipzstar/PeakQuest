import { GettingStartedFormSchema } from "@peakquest/validators";
import * as z from "zod";

export type UserFormData = z.infer<typeof GettingStartedFormSchema>

export interface CharacterData {
    id: number;
    name?: string;
    src: string;
    width: number;
    height: number;
    alt: string;
}
