/** @format */

import { Module } from "@nestjs/common"
import { UsersController } from "./users.controller"
import { UsersService } from "./users.service"
import { SequelizeModule } from "@nestjs/sequelize"
import { User } from "./users.model"
import { Role } from "src/role/role.model"
import { UserRoles } from "src/role/userRoles.model"
import { RoleService } from "src/role/role.service"
import { RoleModule } from "src/role/role.module"

@Module({
	controllers: [UsersController],
	providers: [UsersService],
	imports: [
        SequelizeModule.forFeature([User, Role, UserRoles]),
        RoleModule
    ],
})
export class UsersModule {}
 