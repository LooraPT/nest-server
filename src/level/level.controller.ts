import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/check-role.guard';
import { Roles } from 'src/roles/roles.decorator';
import { CreateLevelDto } from './dto/create-level.dto';
import { LevelService } from './level.service';
import { Level } from './models/level.model';

@ApiTags('Level')
@Controller('level')
export class LevelController {

    constructor(private levelService: LevelService) { }

    @ApiOperation({ summary: 'create level for subscription' })
    @ApiResponse({ status: 200, type: Level })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post()
    createAndAddLevel(@Body() dto: CreateLevelDto) {
        return this.levelService.createLevelsForSubscription(dto)
    }

}
