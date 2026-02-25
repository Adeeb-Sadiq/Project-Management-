import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDTO } from './dto/update-user.dto';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}
    @Get()
    getUsers(@Query('role') role?: string) {
        return this.userService.getUsers(role)
    }

    @Get(":id")
    getOneUser(@Param('id', ParseIntPipe) id: number) {
        return this.userService.getOneUser(id)
    }

    @Post()
    createUser(@Body(ValidationPipe) createUserDTO: CreateUserDTO) {
        return this.userService.createUser(createUserDTO);
    }

    @Patch(":id")
    updateUser(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDTO: UpdateUserDTO) {
        return this.userService.updateUser(id, updateUserDTO)
    }

    @Delete(":id")
    deleteUser(@Param('id', ParseIntPipe) id: number){
        return this.userService.deleteUser(id)
    }
}
