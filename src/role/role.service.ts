import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/createRoleDto';
import { Role } from './role.model';

@Injectable()
export class RoleService {

    constructor(@InjectModel(Role) readonly rolesRepo: typeof Role) {}

    async createRole(dto : CreateRoleDto) {
        const role = await this.rolesRepo.create(dto)
        return role
    }

    async getRoleByValue(value: string) {
        const role = await this.rolesRepo.findOne({where: {value}})
        return role
    }

}
