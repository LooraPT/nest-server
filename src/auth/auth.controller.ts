import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
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
        const user = await this.authService.registration(dto);
        response.cookie('refreshToken', user.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
        return user
    }

    @ApiOperation({ summary: 'Login user' })
    @ApiResponse({ status: 200, type: User })
    @Post('/login')
    login(@Body() dto: CreateUserDto) {

    }

    @ApiOperation({ summary: 'Logout user' })
    @ApiResponse({ status: 200 })
    @Post('/logout')
    logout() {

    }

    @Get('/refresh')
    refresh() {

    }
}
