import * as z from "zod";

export const CreatePostSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});

export const GettingStartedFormSchema = z.object({
  name: z.string().min(5, {
    message: "Must be at least 5 characters.",
  }),
  email: z.string().email("Please enter a valid email address."),
})
