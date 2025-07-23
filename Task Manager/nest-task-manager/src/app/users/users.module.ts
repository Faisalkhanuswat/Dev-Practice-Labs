import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from 'src/models/user/user.schema';
import { UserSubscriber } from 'src/models/user/user.subscriber';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserSchema])
  ],
  providers: [UsersService, UserSubscriber],
  exports: [UsersService]
})
export class UsersModule { }
