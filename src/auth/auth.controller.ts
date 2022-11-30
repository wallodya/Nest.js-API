import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/createUserDTO';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/login')
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto)
    } 

    @Post('/register')
    register(@Body() userDto: CreateUserDto) {
        return this.authService.register(userDto)
    }
}
