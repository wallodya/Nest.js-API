import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDTO';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private usesrService: UsersService) {}

    @Post()
    create(@Body() dto: CreateUserDto) {
        return this.usesrService.createUser(dto)
    }   

    @Get()
    getAll() {
        return this.usesrService.getAllUsers()
    }
}
