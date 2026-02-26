import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { DatabaseService } from 'src/database/database.service';
@Injectable()
export class UsersService {
    
    constructor(private readonly databaseService: DatabaseService) {}

    async getUsers(role?: string) {
        if(role) {
            const useArray = await this.databaseService.users.findMany({
                where: {role},
            })
            if(useArray.length === 0) throw new NotFoundException('User role not found')
            return useArray
        }
        return this.databaseService.users.findMany()
    }

    async getOneUser(id: number) {
        const user = await this.databaseService.users.findUnique({
            where: {id: id}
        })
        if(!user) throw new NotFoundException('User not found')
        return user
    }

    async createUser(createUserDTO: CreateUserDTO) {
        const newUser = await this.databaseService.users.create({
            data: createUserDTO
        })
        return newUser

    }

    async updateUser(id: number, updateUserDTO: UpdateUserDTO) {
        await this.getOneUser(id);
        return this.databaseService.users.update({
            where: {id: id},
            data: updateUserDTO,
        })
    }

    async deleteUser(id: number) {
        const removedUser = await this.getOneUser(id)
        return this.databaseService.users.delete({
            where: {
                id: removedUser.id,
            }
        })
    }

}
