import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './models/roles.model';
import { RolesService } from './roles.service';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {

    constructor(private roleService: RolesService) { }

    @ApiOperation({ summary: 'Create role' })
    @ApiResponse({ status: 200, type: Role })
    @Post()
    createRole(@Body() dto: CreateRoleDto) {
        return this.roleService.createRole(dto);
    }

    @ApiOperation({ summary: 'Get all role' })
    @ApiResponse({ status: 200, type: [Role] })
    @Get()
    getAll() {
        return this.roleService.getAll();
    }

    @ApiOperation({ summary: 'Delete role by id' })
    @ApiResponse({ status: 200 })
    @Delete('/:id')
    deleteRoleById(@Param('id') id: number) {
        return this.roleService.deleteById(id);
    }

    @ApiOperation({ summary: 'Get role by value(name)' })
    @ApiResponse({ status: 200, type: Role })
    @Get('/:value')
    getRoleByValue(@Param('value') value: string) {
        return this.roleService.getRoleByValue(value);
    }
}
