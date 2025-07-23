import { TaskStatus } from "src/app/tasks/interfaces/enums.enum";

export const validateStatus = (val: string) => {
    const statuses = [`${TaskStatus.DONE}`, `${TaskStatus.OPEN}`, `${TaskStatus.IN_PROGRESS}`];
    return statuses.includes(val.toUpperCase());
}