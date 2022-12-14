/** @format */

import { Module } from "@nestjs/common"
import { SequelizeModule } from '@nestjs/sequelize'
import { UsersModule } from './users/users.module'
import { ConfigModule } from '@nestjs/config'
import { User } from "./users/users.model"
import { RoleModule } from './role/role.module';
import { Role } from "./role/role.model"
import { UserRoles } from "./role/userRoles.model"
import { AuthModule } from "./auth/auth.module"
import { PostsController } from './posts/posts.controller';
import { PostsModule } from './posts/posts.module';
import { Post } from "./posts/posts.model"
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from "@nestjs/serve-static"
import * as path from 'path'

@Module({
	exports: [],
	imports: [
        ConfigModule.forRoot({
            envFilePath: `.env.${process.env.NODE_ENV}`
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static')
        }),
		SequelizeModule.forRoot({
			dialect: 'postgres',
			host: process.env.POSTGRES_HOST,
			port: Number(process.env.POSTGRES_PORT),
			username: String(process.env.POSTGRES_USER),
			password: String(process.env.POSTGRES_PASSWORD),
			database: String(process.env.POSTGRES_DB),
			models: [User, Role, UserRoles, Post],
            autoLoadModels: true
		}),
		UsersModule,
		RoleModule,
        AuthModule,
        PostsModule,
        FilesModule
	],
	controllers: [PostsController],
	providers: [],
})
export class AppModule {}
