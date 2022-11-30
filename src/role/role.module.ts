import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { SequelizeModule } from '@nestjs/sequelize'
import { Role } from './role.model';
import { UserRoles } from './userRoles.model';
import { User } from 'src/users/users.model';

@Module({
    controllers: [RoleController],
    providers: [RoleService],
    imports: [
        SequelizeModule.forFeature([Role, User, UserRoles])
    ],
    exports: [
        RoleService
    ]
})
export class RoleModule {}
