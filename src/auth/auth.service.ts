import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { CreateUserDto } from 'src/users/dto/user-create.dto';
import { UsersService } from 'src/users/users.service';
import * as bcryptjs from 'bcryptjs';
import { User } from 'src/users/models/users.model';
import { JwtService } from '@nestjs/jwt';
import { Token } from 'src/token/models/token.model';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService,
        private jwtService: JwtService,
        private tokenService: TokenService) { }

    async registration(dto: CreateUserDto) {
        const userMb = await this.usersService.getUserByEmail(dto.email);
        if (userMb) {
            throw new HttpException('user already exist', HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcryptjs.hash(dto.password, 5);
        const createUser = await this.usersService.createUser({ ...dto, password: hashPassword })
        const accessToken = this.generateAccessToken(createUser)
        const refreshToken = this.tokenService.generateRefreshToken(createUser)
        const saveToken = await this.tokenService.saveToken(createUser.id, refreshToken);
        return { accessToken: accessToken, refreshToken: refreshToken, user: { id: createUser.id, email: createUser.email, roles: createUser.roles } }
    }

    generateAccessToken(user: User) {
        const payload = { id: user.id, email: user.email, roles: user.roles };
        const token = this.jwtService.sign(payload)
        return token
    }
}
