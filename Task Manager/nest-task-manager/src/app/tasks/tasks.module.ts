import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskSchema } from '../../models/task/task.schema';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskSchema])
  ],
  controllers: [TasksController],
  providers: [TasksService, TypeOrmModule]
})
export class TasksModule { }
