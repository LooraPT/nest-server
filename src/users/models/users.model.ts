import { ApiProperty } from '@nestjs/swagger';
import { BelongsToMany, Column, DataType, HasMany, HasOne, Model, Table } from 'sequelize-typescript';
import { Order } from 'src/order/models/order.model';
import { Profile } from 'src/profile/models/profile.model';
import { Role } from 'src/roles/models/roles.model';
import { UserRoles } from 'src/roles/models/user-roles.model';
import { Subscription } from 'src/subscription/models/subscription.model';
import { UserSubscription } from 'src/subscription/models/user-subscriptions.model';
import { Token } from 'src/token/models/token.model';

interface UserCreationsAttrs {
    email: string;
    password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationsAttrs> {
    @ApiProperty({ example: '1', description: 'id user' })
    @Column({ type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true })
    id: number;

    @ApiProperty({ example: 'user@gmail.com', description: 'user email' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string;

    @ApiProperty({ example: '1111', description: 'user password' })
    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[]

    @HasOne(() => Token)
    refreshToken: Token;

    @HasOne(() => Profile)
    profile: Profile;

    @BelongsToMany(() => Subscription, () => UserSubscription)
    subscriptions: Subscription[];

    @HasMany(() => Order)
    orders: Order[];
}