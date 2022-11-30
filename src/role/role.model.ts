import { Model, DataType, Table, Column, BelongsToMany } from 'sequelize-typescript'
import { User } from 'src/users/users.model'
import { UserRoles } from './userRoles.model'

interface RolesCreationAttr {
    value: string
    description: string
}

@Table({
    tableName: 'roles'
})
export class Role extends Model<Role, RolesCreationAttr> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false
    })
    value: string

    @Column({
        type: DataType.STRING,
        unique: false,
        allowNull: false
    })
    description: string

    @BelongsToMany(() => User, () => UserRoles)
    users: User[]
}