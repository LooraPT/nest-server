import { ApiProperty } from "@nestjs/swagger";

export class CreateLevelDto {
    @ApiProperty({ example: 'pro', description: 'level level' })
    readonly level: string;

    @ApiProperty({ example: 160, description: 'level price for six month' })
    readonly priceSix: number;

    @ApiProperty({ example: 1600, description: 'level price for twelve month' })
    readonly priceTwelve: number;

    @ApiProperty({ example: 100, description: 'subscription id' })
    readonly subscriptionId: number;
}