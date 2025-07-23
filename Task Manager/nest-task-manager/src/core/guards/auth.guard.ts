import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppCode } from '../code-enum';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') { }


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    handleRequest(err: null | string, user: any, info: string) {
        if (err || !user) {
            throw err || new UnauthorizedException({ message: 'Invalid token or expired', code: AppCode.UNAUTHORIZED });
        }
        return user;
    }
}
