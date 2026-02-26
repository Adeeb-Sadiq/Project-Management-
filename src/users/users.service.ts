import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
// import { Prisma } from 'generated/prisma/client';
import { DatabaseService } from 'src/database/database.service';
@Injectable()
export class UsersService {
    
    constructor(private readonly databaseService: DatabaseService) {}

    // private users = [
    //   { id: 1, name: "Alice Johnson", email: "alice.johnson@example.com", role: "Admin" },
    //   { id: 2, name: "Brian Smith", email: "brian.smith@example.com", role: "Dev" },
    //   { id: 3, name: "Carla Martinez", email: "carla.martinez@example.com", role: "Intern" },
    //   { id: 4, name: "David Lee", email: "david.lee@example.com", role: "Dev" },
    //   { id: 5, name: "Emma Wilson", email: "emma.wilson@example.com", role: "Admin" },
    //   { id: 6, name: "Frank Brown", email: "frank.brown@example.com", role: "Dev" },
    //   { id: 7, name: "Grace Taylor", email: "grace.taylor@example.com", role: "Intern" },
    //   { id: 8, name: "Henry Anderson", email: "henry.anderson@example.com", role: "Dev" },
    //   { id: 9, name: "Isabella Thomas", email: "isabella.thomas@example.com", role: "Intern" },
    //   { id: 10, name: "Jack White", email: "jack.white@example.com", role: "Admin" }
    // ];

    // private id = 11;

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
