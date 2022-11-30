/** @format */

import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/sequelize"
import { RoleService } from "src/role/role.service"
import { CreateUserDto } from "./dto/createUserDTO"
import { User } from "./users.model"

@Injectable()
export class UsersService {
	constructor(@InjectModel(User) private userRepo: typeof User, private roleService: RoleService) {}

	async createUser(dto: CreateUserDto) {
		const user = await this.userRepo.create(dto)
		const role = await this.roleService.getRoleByValue("USER")
		await user.$set("roles", [role.id])
        user.roles = [role]
		return user
	}

	async getAllUsers() {
		const users = await this.userRepo.findAll({ include: { all: true } })
		return users
	}

	async getUserByEmail(email: string) {
		const user = await this.userRepo.findOne({
			where: { email },
			include: {
				all: true,
			},
		})

        return user
	}
}
