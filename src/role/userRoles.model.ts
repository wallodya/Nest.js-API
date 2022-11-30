/** @format */

import { Model, DataType, Table, Column, BelongsToMany, ForeignKey } from "sequelize-typescript"
import { User } from "src/users/users.model"
import { Role } from "./role.model"

@Table({
	tableName: "userRoles",
    createdAt: false,
    updatedAt: false
})
export class UserRoles extends Model<UserRoles> {
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number

    @ForeignKey(() => Role)
	@Column({
		type: DataType.INTEGER,
	})
	roleId: number

    @ForeignKey(() => User)
	@Column({
		type: DataType.INTEGER,
	})
	userId: number
}
