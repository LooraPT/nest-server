import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/users/dto/user-create.dto';
import { User } from 'src/users/models/users.model';
import { AuthService } from './auth.service';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @ApiOperation({ summary: 'Create new user' })
    @ApiResponse({ status: 200, type: User })
    @Post('/registration')
    async registration(@Body() dto: CreateUserDto, @Res({ passthrough: true }) response: Response) {
        const registrationUser = await this.authService.registration(dto);
        response.cookie('refreshToken', registrationUser.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
        return registrationUser;
    }

    @ApiOperation({ summary: 'Login user' })
    @ApiResponse({ status: 200, type: User })
    @Post('/login')
    async login(@Body() dto: CreateUserDto, @Res({ passthrough: true }) response: Response) {
        const loginUser = await this.authService.login(dto);
        response.cookie('refreshToken', loginUser.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
        return loginUser
    }

    @ApiOperation({ summary: 'Logout user' })
    @ApiResponse({ status: 200 })
    @Post('/logout')
    async logout(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
        const { refreshToken } = request.cookies;
        await this.authService.logout(refreshToken);
        response.clearCookie('refreshToken')
    }

    @Get('/refresh')
    async refresh(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
        const { refreshToken } = request.cookies;
        const refresh = await this.authService.refresh(refreshToken);
        response.cookie('refreshToken', refresh.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
        return refresh;
    }
}
