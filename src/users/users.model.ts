import { Model, DataType, Table, Column } from 'sequelize-typescript'

interface UserCreationAttr {
    email: string
    password: string
}

@Table({
    tableName: 'users'
})
export class User extends Model<User, UserCreationAttr> {
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
    email: string

    @Column({
        type: DataType.STRING,
        unique: false,
        allowNull: false
    })
    password: string
    
    @Column({
        type: DataType.BOOLEAN,
        unique: false,
        allowNull: true
    })
    banned: boolean

    @Column({
        type: DataType.STRING,
        unique: false,
        allowNull: true
    })
    banReason: string

}