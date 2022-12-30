import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, Length } from "class-validator";


export class CreateUserDto {
    @ApiProperty({ example: 'user@gmail.com', description: 'user email' })
    @IsString({ message: 'should be a string' })
    @IsEmail({}, { message: 'wrong email' })
    readonly email: string;

    @ApiProperty({ example: '1111', description: 'user password' })
    @IsString({ message: 'should be a string' })
    @Length(4, 25, { message: 'password must be longer than 3 characters and shorter than 25' })
    readonly password: string;
} 