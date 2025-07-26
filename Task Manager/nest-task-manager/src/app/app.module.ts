import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import envFileConfig from '../config/env.config';
import { DbModule } from '../config/db.config';
import yamlConfig from 'src/config/yaml.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: envFileConfig,
      load: [yamlConfig],
      isGlobal: true
    }),
    DbModule,
    TasksModule,
    AuthModule,
    UsersModule
  ],
})
export class AppModule { }

