import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/models/users.model';
import { AddRoleDto } from './dto/add-role.dto';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './models/roles.model';

@Injectable()
export class RolesService {

    constructor(@InjectModel(Role) private rolesRepository: typeof Role,
        @InjectModel(User) private usersRepository: typeof User) { }

    async createRole(dto: CreateRoleDto): Promise<Role> {
        const checkExRole = await this.rolesRepository.findOne({ where: { value: dto.value } })
        if (checkExRole) {
            throw new HttpException('role already exist', HttpStatus.BAD_REQUEST)
        }
        const createRole = await this.rolesRepository.create(dto);
        return createRole;
    }

    async getAll(): Promise<Role[]> {
        const allRoles = await this.rolesRepository.findAll();
        return allRoles;
    }

    async deleteById(id: number): Promise<void> {
        const delRole = await this.rolesRepository.findByPk(id);
        await delRole.destroy();
    }

    async getRoleByValue(value: string): Promise<Role> {
        const role = await this.rolesRepository.findOne({ where: { value } })
        if (value === 'USER' && !role.value) {
            const userRole = await this.rolesRepository.create({value: 'USER', description: 'just user'});
            return userRole;
        }
        if (!role) {
            throw new HttpException('role not found', HttpStatus.BAD_REQUEST)
        }
        return role;
    }

    async addRole(dto: AddRoleDto): Promise<number> {
        const user = await this.usersRepository.findByPk(dto.userId)
        const role = await this.getRoleByValue(dto.value)
        if (user && role) {
            await user.$add('role', role.id);
            return user.id;
        }
        throw new HttpException('role or user not found', HttpStatus.BAD_REQUEST)
    }
}
