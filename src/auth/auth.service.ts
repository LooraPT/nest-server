import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { CreateUserDto } from 'src/users/dto/user-create.dto';
import { UsersService } from 'src/users/users.service';
import * as bcryptjs from 'bcryptjs';
import { User } from 'src/users/models/users.model';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/token/token.service';
import { Request, Response } from 'express';
import { ProfileService } from 'src/profile/profile.service';

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService,
        private jwtService: JwtService,
        private tokenService: TokenService,
        private profileService: ProfileService) { }

    async registration(dto: CreateUserDto) {
        const userMb = await this.usersService.getUserByEmail(dto.email);
        if (userMb) {
            throw new HttpException('user already exist', HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcryptjs.hash(dto.password, 5);
        const createUser = await this.usersService.createUser({ ...dto, password: hashPassword })
        const accessToken = this.generateAccessToken(createUser)
        const refreshToken = this.tokenService.generateRefreshToken(createUser)
        await this.tokenService.saveToken(createUser.id, refreshToken);
        const profile = await this.profileService.createProfile(createUser.id)
        return { accessToken: accessToken, refreshToken: refreshToken, user: { id: createUser.id, email: createUser.email, roles: createUser.roles }, profile }
    }

    async login(dto: CreateUserDto) {
        const user = await this.usersService.getUserByEmail(dto.email);
        if (!user) {
            throw new HttpException('user not found', HttpStatus.BAD_REQUEST)
        }
        const passEqual = await bcryptjs.compare(dto.password, user.password)
        if (!passEqual) {
            throw new HttpException('email or password is not success', HttpStatus.BAD_REQUEST)
        }
        const accessToken = this.generateAccessToken(user)
        const refreshToken = this.tokenService.generateRefreshToken(user)
        await this.tokenService.saveToken(user.id, refreshToken);
        const profile = await this.profileService.getProfileById(user.id)
        return { accessToken: accessToken, refreshToken: refreshToken, user: { id: user.id, email: user.email, roles: user.roles }, profile }
    }

    async logout(refreshToken: string): Promise<void> {
        await this.tokenService.deleteToken(refreshToken);
    }

    async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw new HttpException('user not authorization', HttpStatus.UNAUTHORIZED)
        }
        const validateToken = this.tokenService.validateRefreshToken(refreshToken);
        const findToken = await this.tokenService.findToken(refreshToken)
        if (!validateToken || !findToken) {
            throw new HttpException('user not authorization', HttpStatus.UNAUTHORIZED)
        }
        const user = await this.usersService.getUserByEmail(validateToken.email)
        const newAccessToken = this.generateAccessToken(user)
        const newRefreshToken = this.tokenService.generateRefreshToken(user)
        await this.tokenService.saveToken(user.id, newRefreshToken);
        const profile = await this.profileService.getProfileById(user.id)
        return { accessToken: newAccessToken, refreshToken: newRefreshToken, user: { id: user.id, email: user.email, roles: user.roles }, profile }
    }

    validateAccessToken(accessToken: string) {
        const userData = this.jwtService.verify(accessToken)
        return userData;
    }

    generateAccessToken(user: User) {
        const payload = { id: user.id, email: user.email, roles: user.roles };
        const token = this.jwtService.sign(payload)
        return token
    }
}
