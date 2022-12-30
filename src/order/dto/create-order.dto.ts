import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderDto {
    @ApiProperty({ example: '+31434234234', description: 'user phone number' })
    readonly phone: string;

    @ApiProperty({ example: 'user@gmail.com', description: 'user email' })
    readonly email: string;

    @ApiProperty({ example: 'Vasya Pupkin', description: 'user full name' })
    readonly fullName: string;

    @ApiProperty({ example: 1, description: 'user id' })
    readonly userId: number;

    @ApiProperty({ example: 1, description: 'subscription id' })
    readonly subscriptionId: number;

}