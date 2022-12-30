import { ApiProperty } from '@nestjs/swagger';
import { BelongsToMany, Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Level } from 'src/level/models/level.model';
import { Order } from 'src/order/models/order.model';
import { User } from 'src/users/models/users.model';
import { UserSubscription } from './user-subscriptions.model';

interface SubscriptionCreationsAttrs {
    img: string;
    name: string;
    description: string;

}

@Table({ tableName: 'subscriptions' })
export class Subscription extends Model<Subscription, SubscriptionCreationsAttrs> {
    @ApiProperty({ example: '1', description: 'id subscription' })
    @Column({ type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true })
    id: number;

    @ApiProperty({ example: 'subscriptions.jpeg', description: 'subscriptions img' })
    @Column({ type: DataType.STRING, unique: true })
    img: string;

    @ApiProperty({ example: 'netflix', description: 'subscriptions name' })
    @Column({ type: DataType.STRING, allowNull: false })
    name: string;

    @ApiProperty({ example: '+380111111111', description: 'subscriptions description' })
    @Column({ type: DataType.STRING, allowNull: false })
    description: string;

    @BelongsToMany(() => User, () => UserSubscription)
    users: User[];

    @HasMany(() => Level)
    levels: Level[];

    @HasMany(() => Order)
    orders: Order[];

}