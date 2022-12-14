import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/user-create.dto';
import { User } from './models/users.model';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private usersRepository: typeof User) { }

    async createUser(dto: CreateUserDto) {
        const userMb = await this.usersRepository.findOne({ where: { email: dto.email } })
        if (userMb) {
            throw new HttpException('user already exist', HttpStatus.BAD_REQUEST)
        }

    }
}
