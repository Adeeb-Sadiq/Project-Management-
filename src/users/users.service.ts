import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    private users = [
      { id: 1, name: "Alice Johnson", email: "alice.johnson@example.com", role: "Admin" },
      { id: 2, name: "Brian Smith", email: "brian.smith@example.com", role: "Dev" },
      { id: 3, name: "Carla Martinez", email: "carla.martinez@example.com", role: "Intern" },
      { id: 4, name: "David Lee", email: "david.lee@example.com", role: "Dev" },
      { id: 5, name: "Emma Wilson", email: "emma.wilson@example.com", role: "Admin" },
      { id: 6, name: "Frank Brown", email: "frank.brown@example.com", role: "Dev" },
      { id: 7, name: "Grace Taylor", email: "grace.taylor@example.com", role: "Intern" },
      { id: 8, name: "Henry Anderson", email: "henry.anderson@example.com", role: "Dev" },
      { id: 9, name: "Isabella Thomas", email: "isabella.thomas@example.com", role: "Intern" },
      { id: 10, name: "Jack White", email: "jack.white@example.com", role: "Admin" }
    ];

    private id = 11;

    getUsers(role?: string) {
        if(role) {
            const useArray = this.users.filter(user=> user.role === role)
            if(useArray.length === 0) throw new NotFoundException('User role not found')
            return useArray
        }
        return this.users
    }

    getOneUser(id: number) {
        const user = this.users.find(user => user.id === id)
        if(!user) throw new NotFoundException('User not found')
        return user
    }

    createUser(createUserDTO: CreateUserDTO) {
        const newUser = {id: this.id++, ...createUserDTO}
        this.users.push(newUser)
        return newUser
    }

    updateUser(id: number, updateUserDTO: UpdateUserDTO) {
        this.users = this.users.map(user => {
            if(user.id === id){
                return {...user, ...updateUserDTO}
            }
            return user
        })
        return this.getOneUser(id)
    }

    deleteUser(id: number) {
        const removedUser = this.getOneUser(id)
        this.users = this.users.filter(user => user.id !== id)
        return removedUser
    }

}
