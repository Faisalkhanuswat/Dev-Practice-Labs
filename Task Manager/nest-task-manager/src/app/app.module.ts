import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from '../config/db/db.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import envFileConfig from '../config/env.config';
import yamlConfig from 'src/config/yaml.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: envFileConfig,
      load: [yamlConfig],
      isGlobal: true
    }),
    DbModule,
    AuthModule,
    UsersModule,
    TasksModule,
  ],
})
export class AppModule { }

