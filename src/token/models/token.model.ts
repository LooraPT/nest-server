import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from 'src/users/models/users.model';

interface TokenCreationsAttrs {
    userId: number;
    refreshToken: string;
}

@Table({ tableName: 'token' })
export class Token extends Model<Token, TokenCreationsAttrs> {
    @ApiProperty({ example: '1', description: 'id refresh token' })
    @Column({ type: DataType.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement: true })
    id: number;

    @ApiProperty({ example: 'token', description: 'user token' })
    @Column({ type: DataType.TEXT, unique: true })
    refreshToken: string;

    @BelongsTo(() => User)
    user: User;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number;

}