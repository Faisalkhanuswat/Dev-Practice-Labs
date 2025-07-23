import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskSchema } from '../../models/task/task.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskSchema]),
    AuthModule
  ],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TypeOrmModule]
})
export class TasksModule { }
