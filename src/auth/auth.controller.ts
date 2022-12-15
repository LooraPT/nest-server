import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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
    registration(@Body() dto: CreateUserDto) {
        return this.authService.registration(dto);
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
