import * as z from "zod";

export const notEmpty = (message: string) => z.string().trim().min(1, { message });

export const GettingStartedFormSchema = z.object({
  name: z.string().min(5, {
    message: "Must be at least 5 characters.",
  }),
  email: z.string().email("Please enter a valid email address."),
})
