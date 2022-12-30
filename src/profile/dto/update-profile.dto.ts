import { ApiProperty } from "@nestjs/swagger";

export class UpdateProfileDto {
    @ApiProperty({ example: 'heu134guy', description: 'username' })
    readonly username: string;

    @ApiProperty({ example: '+380 096 111', description: 'user phone' })
    readonly phone: string;

    @ApiProperty({ example: 'Vasya Pupkin', description: 'full name' })
    readonly fullName: string;
}