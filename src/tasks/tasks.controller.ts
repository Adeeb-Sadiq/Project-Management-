import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {

    constructor(private readonly taskService: TasksService) {}
    
    @Get()
    getTasks(@Query('user') user?: number, @Query('board') board?: string) {
        return this.taskService.getTasks(user, board);
    }

    @Get(':id')
    getOneTask(@Param('id', ParseIntPipe) id: number) {
        return this.taskService.getOneTask(id);
    }

    @Post() 
    createTask(@Body(ValidationPipe) task: CreateTaskDto) {
        return this.taskService.createTask(task);
    }

    @Patch(":id")
    updateTask(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) task: UpdateTaskDto) {
        return this.taskService.updateTask(id, task);
    }

    @Delete(":id")
    deleteTask(@Param('id', ParseIntPipe) id: number) {
        return this.taskService.deleteTask(id);
    }
}
