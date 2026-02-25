import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {

    @Get()
    getUsers() {
        return []
    }

    @Get(":id")
    getOneUser(@Param('id', ParseIntPipe) id: number) {
        return id
    }

    @Post()
    createUser(@Body() user: {}) {
        return user
    }

    @Patch(":id")
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: {}) {
        return {id, ...user}
    }

    @Delete(":id")
    deleteUser(@Param('id', ParseIntPipe) id: number){
        return id
    }
}
