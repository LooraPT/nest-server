import { ApiProperty } from "@nestjs/swagger";

export class CreateSubscriptionDto {
    @ApiProperty({ example: 'Netflix', description: 'subscription name' })
    readonly name: string;

    @ApiProperty({ example: 'This service is so good', description: 'subscription description' })
    readonly description: string;

}