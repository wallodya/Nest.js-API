import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize'
import { CreateUserDto } from './dto/createUserDTO';
import { User } from './users.model';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepo: typeof User) {}

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepo.create(dto)
        return user
    }

    async getAllUsers() {
        const users = await this.userRepo.findAll()
        return users
    }
}
