import { EntitySchema } from "typeorm";
import { Task } from "./task.entity";
import { TaskStatus } from "src/app/tasks/interfaces/enums.enum";

export const TaskSchema = new EntitySchema<Task>({
    name: 'Task',
    tableName: "tasks",
    target: Task,
    columns: {
        id: {
            type: 'uuid',
            primary: true,
            generated: "uuid",
        },
        title: {
            type: String
        },
        description: {
            type: String
        },
        status: {
            type: String,
            enum: TaskStatus,
            default: `${TaskStatus.OPEN}`
        },
        userId: {
            type: 'uuid',
            nullable: false
        }
    },
    relations: {
        user: {
            type: 'many-to-one',
            target: 'User',
            joinColumn: {
                name: 'userId'
            },
            eager: false,
            onDelete: 'CASCADE'
        },
    }
})