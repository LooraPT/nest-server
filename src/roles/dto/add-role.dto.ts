import { ApiProperty } from "@nestjs/swagger";


export class AddRoleDto {
    @ApiProperty({ example: 'USER', description: 'name role' })
    readonly value: string;

    @ApiProperty({ example: '1', description: 'id user' })
    readonly userId: number;
}