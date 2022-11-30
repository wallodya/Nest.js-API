/** @format */

import { Module } from "@nestjs/common"
import { SequelizeModule } from '@nestjs/sequelize'
import { UsersModule } from './users/users.module'
import { ConfigModule } from '@nestjs/config'
import { User } from "./users/users.model"
console.log(process.env.NODE_ENV)
@Module({
	exports: [],
	imports: [
        ConfigModule.forRoot({
            envFilePath: `.env.${process.env.NODE_ENV}`
        }),
		SequelizeModule.forRoot({
			dialect: 'postgres',
			host: process.env.POSTGRES_HOST,
			port: Number(process.env.POSTGRES_PORT),
			username: String(process.env.POSTGRES_USER),
			password: String(process.env.POSTGRES_PASSWORD),
			database: String(process.env.POSTGRES_DB),
			models: [User],
            autoLoadModels: true
		}),
		UsersModule, 
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
