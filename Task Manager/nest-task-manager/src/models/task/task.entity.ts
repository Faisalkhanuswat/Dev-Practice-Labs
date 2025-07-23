import { TaskStatus } from "src/app/tasks/interfaces/enums.enum";
import { User } from "../user/user.entity";


export class Task {
    id: String;
    title: String;
    description: String;
    status: TaskStatus;
    userId: string;
    user: User;
}