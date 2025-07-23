import { Body, Controller, HttpCode, Post, Query, Req, Res, UseGuards, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { ZodValidationPipe } from 'src/core/pipes/validation.pipe';
import { signupValidationSchema } from './validations/signup.schema';
import { Request, Response } from 'express';
import { User } from 'src/models/user/user.entity';
import { JwtAuthGuard, LocalAuthGuard } from 'src/core/guards/auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private service: AuthService) { }

    @Post('/signup')
    @UsePipes(new ZodValidationPipe(signupValidationSchema))
    signup(@Body() body: SignupDto) {
        return this.service.signup(body);
    }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    @HttpCode(200)
    login(@Req() req: Request, @Res({ passthrough: true }) res: Response, @Query('type') type: string) {
        return this.service.login(req.user as User, type, res);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/logout')
    logout(@Req() req, @Res({ passthrough: true }) res: Response) {
        return this.service.logout(res)
    }
}
