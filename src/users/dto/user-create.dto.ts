import { ApiProperty } from "@nestjs/swagger";


export class CreateUserDto {
    @ApiProperty({ example: 'user@gmail.com', description: 'user email' })
    readonly email: string;

    @ApiProperty({ example: '1111', description: 'user password' })
    readonly password: string;
} 