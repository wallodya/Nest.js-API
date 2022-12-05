/** @format */

import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/sequelize"
import { RoleService } from "src/role/role.service"
import { addRoleDto } from "./dto/addRoleDto"
import { banUserDto } from "./dto/banUserDto"
import { CreateUserDto } from "./dto/createUserDTO"
import { User } from "./users.model"

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User) private userRepo: typeof User,
		private roleService: RoleService
	) {}

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

	async addRole(dto: addRoleDto) {
		const user = await this.userRepo.findByPk(dto.userId)
		const role = await this.roleService.getRoleByValue(dto.value)

		if (role && user) {
			await user.$add("role", role.id)
			return dto
		}

		throw new HttpException("Wrong role or user", HttpStatus.NOT_FOUND)
	}

	async ban(dto: banUserDto) {
		const user = await this.userRepo.findByPk(dto.userId)
		if (!user) {
			throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND)
		}
		user.banned = true
		user.banReason = dto.reason
		await user.save()
		return user
	}
}
