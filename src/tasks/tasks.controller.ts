import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';

@Controller('tasks')
export class TasksController {
    
    @Get()
    getTasks(@Query('user') user?: string, @Query('board') board?: string) {
        return {user, board};
    }

    @Get(':id')
    getTask(@Param('id', ParseIntPipe) id: number) {
        return {id}
    }

    @Post() 
    createTask(@Body() task: {}) {
        return task;
    }

    @Patch(":id")
    updateTask(@Param('id', ParseIntPipe) id: number, @Body() task) {
        return {id, ...task};
    }

    @Delete(":id")
    deleteTask(@Param('id', ParseIntPipe) id: number) {
        return {id}
    }
}
