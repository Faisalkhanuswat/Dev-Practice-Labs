import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards, UsePipes } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { ZodValidationPipe } from 'src/core/pipes/validation.pipe';
import { createTaskSchema } from './validations/create-task.schema';
import { ValidateIdPipe } from 'src/core/pipes/id.pipe';
import { TaskStatusPipe } from 'src/core/pipes/status.pipe';
import { Task } from '../../models/task/task.entity';
import { JwtAuthGuard } from 'src/core/guards/auth.guard';
import { Request } from 'express';
import { TokenUser } from 'src/core/interfaces/token-user.interface';
import { User } from 'src/core/decorators/user.decorator';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
    constructor(private tasksService: TasksService) { };

    @Get()
    getTasks(@Req() req: Request, @Query("search") search: string, @Query("status") status: string): Promise<Task[]> {
        const { uId } = req.user as TokenUser
        return this.tasksService.getTasks(search, status, uId);
    }

    @Get("/:id")
    getTask(@Param('id', new ValidateIdPipe()) id: string, @User('uId') uId: string): Promise<Task> {
        return this.tasksService.getTask(id, uId);
    }

    @Post()
    createTask(
        @User() user: any,
        @Body(new ZodValidationPipe(createTaskSchema)) createTaskDto: CreateTaskDto
    ): Promise<Task> {
        return this.tasksService.createTask(createTaskDto, user.uId);
    }


    @Patch("/:id")
    updateTask(
        @Param('id', new ValidateIdPipe()) id: string,
        @Body('status', new TaskStatusPipe()) status: string,
        @User('uId') uId: string
    ) {
        return this.tasksService.updateTask(id, status.toUpperCase(), uId);
    }

    @Delete("/:id")
    deleteTask(
        @Param('id', new ValidateIdPipe()) id: string,
        @User('uId') uId: string
    ) {
        return this.tasksService.deleteTask(id, uId);
    }
}
