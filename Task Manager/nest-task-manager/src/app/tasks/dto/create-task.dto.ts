// export class CreateTaskDto {
//     title: string;
//     description: string;
// }

import { z } from "zod";
import { createTaskSchema } from "../validations/create-task.schema";


export type CreateTaskDto = z.infer<typeof createTaskSchema>;