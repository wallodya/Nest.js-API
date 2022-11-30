/** @format */

import { Module } from "@nestjs/common"
import { SequelizeModule } from '@nestjs/sequelize'

@Module({
	exports: [],
	imports: [
		SequelizeModule.forRoot({
			dialect: "postgres",
			host: "localhost",
			port: 5432,
			username: "postgres",
			password: "1963",
			database: "nest_app",
			models: [],
            autoLoadModels: true
		}), 
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
