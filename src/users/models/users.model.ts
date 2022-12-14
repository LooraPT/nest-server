import { ApiProperty } from '@nestjs/swagger';
import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { Role } from 'src/roles/models/roles.model';
import { UserRoles } from 'src/roles/models/user-roles.model';

interface UserCreationsAttrs {
    email: string;
    password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationsAttrs> {
    @ApiProperty({ example: '1', description: 'id user' })
    @Column({ type: DataType.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement: true })
    id: number;

    @ApiProperty({ example: 'user@gmail.com', description: 'user email' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string;

    @ApiProperty({ example: '1111', description: 'user password' })
    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[]
}