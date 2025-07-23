import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UsersService } from "../users/users.service";
import * as bcrypt from 'bcrypt';
import { AppCode } from "src/core/code-enum";
import { User } from "src/models/user/user.entity";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private usersService: UsersService) {
        super()
    }

    async validate(username: string, password: string): Promise<User> {
        const user = await this.usersService.findByUsername(username) as any;
        if (user && user.password) {
            const isMatch = await bcrypt.compare(password, user.password as string);
            if (isMatch) {
                delete user.password;
                return user
            }
        }
        throw new UnauthorizedException({
            message: "Invlaid Credentials",
            code: AppCode.UNAUTHORIZED
        })
    }
}