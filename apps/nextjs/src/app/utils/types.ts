import {GettingStartedFormSchema} from "@1goal/validators";
import * as z from "zod";

export type UserFormData = z.infer<typeof GettingStartedFormSchema>
