import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SignupDto } from './dto/signup.dto';
import { AppCode } from 'src/core/code-enum';
import { UsersService } from '../users/users.service';
import { User } from 'src/models/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { Token } from './interfaces/token.interface';

@Injectable()
export class AuthService {
    constructor(private config: ConfigService,
        private usersSerivce: UsersService,
        private jwtService: JwtService,
    ) { }

    async signup(body: SignupDto) {
        const isexist = await this.usersSerivce.checkUserExist(body.username);
        if (isexist) {
            throw new ConflictException({
                message: 'username already exist.',
                code: AppCode.CONFLICT,
            })
        }
        await this.usersSerivce.createUser(body);
        return {
            message: "Account successfully created.",
            code: AppCode.SUCCESS
        }
    }

    login(user: User, type: string, res: Response) {
        const env = this.config.get<string>('NODE_ENV', 'development');
        const payload = {
            uId: user.id,
            issued: new Date().toJSON()
        }
        const access_token = this.jwtService.sign(payload);
        const expiration = new Date();
        expiration.setDate(expiration.getDate() + 14);
        if (type === 'token') {
            res.clearCookie('access_token', {
                secure: env === 'production',
                sameSite: env === 'production' ? 'lax' : 'none'
            });
            return { uId: user.id, access_token, expiration: expiration.getTime() }
        }
        res.cookie('access_token', access_token, {
            maxAge: 60 * 60 * 1000, // 14 * 24 * 60 * 60 * 1000  =>  14days
            httpOnly: true,
            secure: env !== 'production',
            sameSite: env === 'production' ? 'lax' : 'none'
        });
        return { uId: user.id, expiration: expiration.getTime() };
    }

    logout(res: Response) {
        res.clearCookie('access_token', {
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'none'
        });
        return { message: 'Logged out successfully.', code: AppCode.SUCCESS };
    }
}
