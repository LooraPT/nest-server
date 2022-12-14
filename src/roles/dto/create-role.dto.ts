import { ApiProperty } from "@nestjs/swagger";


export class CreateRoleDto {
    @ApiProperty({ example: 'ADMIN', description: 'role user' })
    readonly value: string;

    @ApiProperty({ example: 'simply admin', description: 'description role' })
    readonly description: string;
}