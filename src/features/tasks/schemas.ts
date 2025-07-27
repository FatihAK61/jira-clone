import {z} from "zod";
import {TaskStatus} from "@/features/tasks/types";

export const createTaskSchema = z.object({
    name: z.string().trim().min(1, "Workspace name is required"),
    status: z.enum(TaskStatus),
    workspaceId: z.string().trim().min(1, "required"),
    projectId: z.string().trim().min(1, "required"),
    dueDate: z.coerce.date(),
    assigneeId: z.string().trim().min(1, "required"),
    description: z.string().optional()
});
