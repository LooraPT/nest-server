import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from 'src/users/models/users.model';
import { Subscription } from './subscription.model';



@Table({ tableName: 'user_subscriptions' })
export class UserSubscription extends Model<UserSubscription> {
    @ApiProperty({ example: '1', description: 'id subscription' })
    @Column({ type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true })
    id: number;

    @ApiProperty({ example: '1', description: 'user id' })
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number;

    @ApiProperty({ example: '1', description: 'subscriptions id' })
    @ForeignKey(() => Subscription)
    @Column({ type: DataType.INTEGER })
    subscriptionId: number;

}