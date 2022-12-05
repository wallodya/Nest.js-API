import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/rolesAuth.decorator';
import { addRoleDto } from './dto/addRoleDto';
import { banUserDto } from './dto/banUserDto';
import { CreateUserDto } from './dto/createUserDTO';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() dto: CreateUserDto) {
        return this.usersService.createUser(dto)
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.usersService.getAllUsers()
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto: addRoleDto) {
        return this.usersService.addRole(dto)
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/ban')
    ban(@Body() dto: banUserDto) {
        return this.usersService.ban(dto)
    }
}
