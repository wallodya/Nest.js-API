/** @format */

import { Module } from "@nestjs/common"
import { SequelizeModule } from "@nestjs/sequelize"
import { FilesModule } from "src/files/files.module"
import { Role } from "src/role/role.model"
import { UserRoles } from "src/role/userRoles.model"
import { User } from "src/users/users.model"
import { Post } from "./posts.model"
import { PostsService } from "./posts.service"

@Module({
	providers: [PostsService],
	imports: [SequelizeModule.forFeature([User, Post]), FilesModule],
	exports: [PostsService],
})
export class PostsModule {}
