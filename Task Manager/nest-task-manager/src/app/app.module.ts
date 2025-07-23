import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import envFileConfig from '../config/env.config';
import dbConfig from '../config/db.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: envFileConfig,
      load: [],
      isGlobal: true
    }),
    dbConfig,
    TasksModule,
    AuthModule,
    UsersModule
  ],
})
export class AppModule { }

