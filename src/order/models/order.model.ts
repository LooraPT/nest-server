import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Subscription } from 'src/subscription/models/subscription.model';
import { User } from 'src/users/models/users.model';

interface OrderCreationsAttrs {
    phone: string;
    email: string;
    fullName: string;
    userId: number;
    subscriptionId: number;
}

@Table({ tableName: 'orders' })
export class Order extends Model<Order, OrderCreationsAttrs> {
    @ApiProperty({ example: '1', description: 'id order' })
    @Column({ type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true })
    id: number;

    @ApiProperty({ example: '+31414142', description: 'user phone' })
    @Column({ type: DataType.STRING, allowNull: false })
    phone: string;

    @ApiProperty({ example: 'email@gmail.com', description: 'user email' })
    @Column({ type: DataType.STRING, allowNull: false })
    email: string;

    @ApiProperty({ example: 'Vasya Pupkin', description: 'user full name' })
    @Column({ type: DataType.STRING, allowNull: false })
    fullName: string;

    @BelongsTo(() => User)
    user: User;

    @ApiProperty({ example: 1, description: 'user id' })
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    userId: number;

    @BelongsTo(() => Subscription)
    subscription: Subscription;

    @ApiProperty({ example: 1, description: 'subscription id' })
    @ForeignKey(() => Subscription)
    @Column({ type: DataType.INTEGER, allowNull: false })
    subscriptionId: number;
}