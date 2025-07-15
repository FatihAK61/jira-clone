import {z} from "zod";

export const loginSchema = z.object({
    email: z.email("Invalid email address!"),
    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .max(24, "Password must be at most 24 characters"),
});

export const registerSchema = z.object({
    name: z.string().min(1, "Name is required").max(50, "Name must be at most 50 characters"),
    email: z.email("Invalid email address!"),
    password: z.string().min(8, "Password must be at least 8 characters").max(24, "Password must be at most 24 characters"),
});
