/** @format */

import { forwardRef, Module } from "@nestjs/common"
import { SequelizeModule } from "@nestjs/sequelize"
import { AuthModule } from "src/auth/auth.module"
import { Role } from "src/role/role.model"
import { RoleModule } from "src/role/role.module"
import { UserRoles } from "src/role/userRoles.model"
import { UsersController } from "./users.controller"
import { User } from "./users.model"
import { UsersService } from "./users.service"

@Module({
	controllers: [UsersController],
	providers: [UsersService],
	imports: [
        SequelizeModule.forFeature([
            User,
            Role,
            UserRoles
        ]),
        RoleModule,
        forwardRef(() => AuthModule)],
	exports: [UsersService],
})
export class UsersModule {}
