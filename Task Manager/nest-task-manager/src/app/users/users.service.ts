import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(private config: ConfigService,
        @InjectRepository(User)
        private user: Repository<User>
    ) { }

    async findByUsername(username: string): Promise<User | undefined | null> {
        const user = await this.user.findOneBy({ username });
        return user
    }

    async checkUserExist(username: string): Promise<number> {
        return await this.user.countBy({ username });
    }

    async createUser(body: { name: string, username: string, password: string }): Promise<User | undefined> {
        const user = this.user.create({
            name: body.name,
            username: body.username,
            password: body.password
        })
        return await this.user.save(user);
    }

    async findById(id: string): Promise<User | undefined | null> {
        const user = await this.user.findOneBy({ id });
        return user
    }

}
