import {Hono} from "hono";
import {zValidator} from "@hono/zod-validator";
import {loginSchema} from "@/features/auth/schemas";

const app = new Hono()
    .post("/login", zValidator("json", loginSchema), (c) => {
        // Handle login logic here
        return c.json({message: "Login successful"});
    });

export default app;
