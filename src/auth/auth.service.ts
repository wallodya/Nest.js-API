/** @format */

import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common"
import { JwtModule, JwtService } from "@nestjs/jwt"
import { CreateUserDto } from "src/users/dto/createUserDTO"
import { UsersService } from "src/users/users.service"
import * as bcrypt from "bcryptjs"
import { User } from "src/users/users.model"

@Injectable()
export class AuthService {
	constructor(private userService: UsersService, private jwtService: JwtService) {}

	async login(dto: CreateUserDto) {
		const user = await this.validateUser(dto)
		return this.generateToken(user)
	}

	async register(dto: CreateUserDto) {
		const candidate = await this.userService.getUserByEmail(dto.email)

		if (candidate) {
			throw new HttpException("user with this email already exists", HttpStatus.BAD_REQUEST)
		}

		const hashedPassword = await bcrypt.hash(dto.password, 5)

		const user = await this.userService.createUser({ ...dto, password: hashedPassword })

		return this.generateToken(user)
	}

	private async validateUser(dto: CreateUserDto) {
		const user = await this.userService.getUserByEmail(dto.email)
		const isPasswordCorrect = await bcrypt.compare(dto.password, user.password)

		if (user && isPasswordCorrect) {
			return user
		}
        console.log('dto from validateUser: ')
        console.log(dto)
        console.log(user)
        console.log('isPasswordCorrect', isPasswordCorrect)
		throw new UnauthorizedException({ message: "Wrong email or password" })
	}

	private async generateToken(user: User) {
		const payload = {
			id: user.id,
			email: user.email,
			roles: user.roles,
		}

		return {
			token: this.jwtService.sign(payload),
		}
	}
}
