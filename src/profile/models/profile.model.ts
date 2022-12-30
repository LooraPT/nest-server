import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from 'src/users/models/users.model';

interface ProfileCreationsAttrs {
    userId: number;
}

@Table({ tableName: 'profiles' })
export class Profile extends Model<Profile, ProfileCreationsAttrs> {
    @ApiProperty({ example: '1', description: 'id profile' })
    @Column({ type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true })
    id: number;

    @ApiProperty({ example: 'img.jpeg', description: 'user img' })
    @Column({ type: DataType.STRING, unique: true })
    img: string;

    @ApiProperty({ example: '+380111111111', description: 'user phone' })
    @Column({ type: DataType.STRING })
    phone: string;

    @ApiProperty({ example: 'nezukoChan', description: 'username' })
    @Column({ type: DataType.STRING })
    username: string;

    @ApiProperty({ example: 'Vasya Pupkin', description: 'full name user' })
    @Column({ type: DataType.STRING })
    fullName: string;

    @BelongsTo(() => User)
    user: User;

    @ApiProperty({ example: '1', description: 'user id' })
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    userId: number;
}