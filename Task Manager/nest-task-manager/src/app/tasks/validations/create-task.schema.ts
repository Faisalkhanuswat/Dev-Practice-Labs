import { z } from "zod";

export const createTaskSchema = z.object({
    title: z.string().nonempty("title is required field."),
    description: z
        .string()
        .nonempty('description is required field.')
        .max(200, 'desctiption exceeded more then 200 chars.')
}).required();