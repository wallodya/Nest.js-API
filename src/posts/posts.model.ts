import { Model, DataType, Table, Column, BelongsTo, ForeignKey } from 'sequelize-typescript'
import { Role } from 'src/role/role.model'
import { UserRoles } from 'src/role/userRoles.model'
import { User } from 'src/users/users.model'

interface PostCreationAttr {
    title: string
    content: string
    userId: number
    image: string
}

@Table({
    tableName: 'posts'
})
export class Post extends Model<Post, PostCreationAttr> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    title: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    content: string

    @Column({
        type: DataType.STRING
    })
    image: string


    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER
    })
    userId: number

    @BelongsTo(() => User)
    author: User
}