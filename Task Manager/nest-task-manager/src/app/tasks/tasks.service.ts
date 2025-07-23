import { BadRequestException, HttpCode, HttpException, HttpStatus, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateTaskDto } from './dto/create-task.dto';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Like, Repository } from 'typeorm';
import { Task } from '../../models/task/task.entity';
import { TaskStatus } from './interfaces/enums.enum';
import { AppCode } from 'src/core/code-enum';

@Injectable()
export class TasksService {
    constructor(private config: ConfigService,
        @InjectRepository(Task)
        private task: Repository<Task>
    ) { }

    async getTasks(search: string, status: string, uId: string): Promise<Task[]> {
        const task = this.task.createQueryBuilder('task');
        task.where('task.userId = :uId', { uId });
        if (search) {
            task.andWhere(
                '(task.title ILIKE :search OR task.description ILIKE :search)',
                { search: `%${search}%` }
            )
        }
        if (status) {
            task.andWhere(
                'task.status = :status', { status }
            )
        }
        const tasks = await task.getMany();
        return tasks;
    }

    async getTask(id: string, uId: string): Promise<Task> {
        const task = await this.task.findOneBy({ id, userId: uId });
        if (task) {
            return task
        }
        throw new NotFoundException({ message: "Task not found.", code: AppCode.NOT_FOUND });
    }

    async createTask({ title, description }: CreateTaskDto, uId: any): Promise<Task> {
        const newTask = this.task.create({
            title,
            description,
            userId: uId
        })
        await this.task.save(newTask);
        return newTask
    }

    async updateTask(id: string, status: string, uId: string): Promise<object> {
        const task = await this.getTask(id, uId);
        if (task?.status === status) {
            throw new BadRequestException({ message: "Task status must be not same with current one.", code: AppCode.BAD_REQUEST });
        }
        task.status = TaskStatus[`${status}`];
        await this.task.save(task);
        return { message: "Task updated successfully", code: AppCode.SUCCESS }
    }

    async deleteTask(id: string, uId: string): Promise<object> {
        const task = await this.getTask(id, uId);
        await this.task.remove(task);
        return { message: "Task deleted successfully", code: AppCode.SUCCESS }
    }

}
