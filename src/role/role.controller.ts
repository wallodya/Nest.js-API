import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateRoleDto } from './dto/createRoleDto';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {

    constructor(private roleService: RoleService) {}

    @Post()
    create(@Body() dto: CreateRoleDto) {
        return this.roleService.createRole(dto)
    }

    @Get('/:value')
    getByValue(@Param() params: { value: string }) {
        console.log('value: ', params.value)
        return this.roleService.getRoleByValue(params.value)
    }
}
