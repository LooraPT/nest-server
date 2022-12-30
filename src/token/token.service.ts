import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/models/users.model';
import { Token } from './models/token.model';

@Injectable()
export class TokenService {

    constructor(@InjectModel(Token) private tokenRepository: typeof Token,
        private jwtService: JwtService) { }


    generateRefreshToken(user: User) {
        const payload = { id: user.id, email: user.email, roles: user.roles };
        const token = this.jwtService.sign(payload)
        return token
    }

    async saveToken(userId: number, refreshToken: string) {
        const token = await this.tokenRepository.findOne({ where: { userId } })
        if (token) {
            token.refreshToken = refreshToken;
            await token.save()
            return token;
        }
        const createToken = await this.tokenRepository.create({ userId, refreshToken })
        return createToken;
    }

    async deleteToken(refreshToken: string): Promise<void> {
        const data = await this.tokenRepository.findOne({ where: { refreshToken } })
        if (data) {
            await data.destroy()
        }
    }

    async findToken(refreshToken: string): Promise<Token> {
        const token = await this.tokenRepository.findOne({ where: { refreshToken } })
        return token;
    }

    validateRefreshToken(refreshToken: string): User {
        const userData = this.jwtService.verify(refreshToken)
        return userData;
    }
}
