import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { Subscription } from 'src/subscription/models/subscription.model';

interface LevelCreationsAttrs {
    level: string;
    priceSix: number;
    priceTwelve: number;
    subscriptionId: number;
}

@Table({ tableName: 'levels' })
export class Level extends Model<Level, LevelCreationsAttrs> {
    @ApiProperty({ example: '1', description: 'id level' })
    @Column({ type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true })
    id: number;

    @ApiProperty({ example: 'pro', description: 'level level' })
    @Column({ type: DataType.STRING, allowNull: false })
    level: string;

    @ApiProperty({ example: 100, description: 'level price for six month' })
    @Column({ type: DataType.INTEGER, allowNull: false })
    priceSix: number;

    @ApiProperty({ example: 100, description: 'level price for twelve month' })
    @Column({ type: DataType.INTEGER, allowNull: false })
    priceTwelve: number;

    @BelongsTo(() => Subscription)
    subscription: Subscription;

    @ApiProperty({ example: 100, description: 'subscription id' })
    @ForeignKey(() => Subscription)
    @Column({ type: DataType.INTEGER, allowNull: false })
    subscriptionId: number;
}