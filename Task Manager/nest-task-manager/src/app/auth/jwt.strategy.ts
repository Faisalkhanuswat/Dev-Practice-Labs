import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, StrategyOptions } from "passport-jwt";
import { Strategy } from "passport-jwt";
import { UsersService } from "../users/users.service";
import { Token } from "./interfaces/token.interface";
import { AppCode } from "src/core/code-enum";


const cookieExtractor = (req: Request): string | null => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['access_token']
    }
    return token;
}

const jwtExtractor = ExtractJwt.fromExtractors([
    cookieExtractor,
    ExtractJwt.fromAuthHeaderAsBearerToken()
])


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(config: ConfigService, private usersService: UsersService) {
        const options: StrategyOptions = {
            jwtFromRequest: jwtExtractor,
            ignoreExpiration: false,
            secretOrKey: config.get<string>("JWT_SECRETE", "")
        }
        super(options);
    }

    async validate({ uId }: Token, done: Function) {
        const isExist = await this.usersService.findById(uId);
        if (!isExist) {
            return done(null, false, { message: 'User not exist.' });
        };
        return { uId: isExist.id };
    }

}