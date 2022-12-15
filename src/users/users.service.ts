import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { CreateUserDto } from './dto/user-create.dto';
import { User } from './models/users.model';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private usersRepository: typeof User,
        private rolesService: RolesService) { }

    async createUser(dto: CreateUserDto): Promise<User> {
        const user = await this.usersRepository.create(dto, { include: { all: true } })
        const role = await this.rolesService.getRoleByValue("USER")
        await user.$set('roles', [role.id])
        user.roles = [role]
        return user;

    }

    async getUserByEmail(email: string): Promise<User> {
        const findUser = await this.usersRepository.findOne({ where: { email }, include: { all: true } })
        return findUser;
    }
}
