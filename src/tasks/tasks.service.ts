import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Prisma } from 'generated/prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TasksService {

    constructor(private readonly databaseService: DatabaseService) {}

    private tasks = [
        {
            "id": 1,
            "title": "design database schema",
            "description": "create initial database models",
            "user": 2,
            "comments": "review relationships with team",
            "board": "Project - Management",
            "dueDate": "28-02-2026"
        },
        {
            "id": 2,
            "title": "implement authentication",
            "description": "add JWT based login system",
            "user": 3,
            "comments": "ensure token expiration is handled",
            "board": "Backend - Development",
            "dueDate": "01-03-2026"
        },
        {
            "id": 3,
            "title": "setup CI/CD pipeline",
            "description": "configure github actions workflow",
            "user": 4,
            "comments": "include test and lint steps",
            "board": "DevOps",
            "dueDate": "03-03-2026"
        },
        {
            "id": 4,
            "title": "create user dashboard UI",
            "description": "design and implement dashboard layout",
            "user": 5,
            "comments": "follow figma design specs",
            "board": "Frontend - Development",
            "dueDate": "05-03-2026"
        },
        {
            "id": 5,
            "title": "write unit tests",
            "description": "add unit tests for service layer",
            "user": 2,
            "comments": "target 80% code coverage",
            "board": "Quality Assurance",
            "dueDate": "06-03-2026"
        },
        {
            "id": 6,
            "title": "optimize database queries",
            "description": "improve performance of slow endpoints",
            "user": 3,
            "comments": "analyze using query profiler",
            "board": "Backend - Optimization",
            "dueDate": "08-03-2026"
        },
        {
            "id": 7,
            "title": "prepare API documentation",
            "description": "document all REST endpoints",
            "user": 6,
            "comments": "use swagger for documentation",
            "board": "Documentation",
            "dueDate": "09-03-2026"
        },
        {
            "id": 8,
            "title": "conduct security audit",
            "description": "review application for vulnerabilities",
            "user": 7,
            "comments": "focus on authentication and authorization",
            "board": "Security",
            "dueDate": "11-03-2026"
        },
        {
            "id": 9,
            "title": "deploy to staging",
            "description": "deploy latest build to staging environment",
            "user": 4,
            "comments": "verify environment variables",
            "board": "Deployment",
            "dueDate": "12-03-2026"
        },
        {
            "id": 10,
            "title": "client feedback review",
            "description": "review feedback from beta users",
            "user": 1,
            "comments": "prioritize critical issues",
            "board": "Project - Management",
            "dueDate": "15-03-2026"
        }
    ]

    private id = 11;

    getTasks(user?: number, board?: string) {
        let response = this.tasks;

        if(user) 
            response = response.filter(task => task.user == user);
            if(response.length === 0) throw new NotFoundException("Task for user not found.");

        if(board) 
            response = response.filter(task => task.board === board);
            if(response.length === 0) throw new NotFoundException("Task for board not found.");

        
        return response;
    }

    getOneTask(id: number) {
        let response = this.tasks.find(task => task.id === id);
        if(!response) throw new NotFoundException("Task Not Found.");
        return response;
    }

    async createTask(request: CreateTaskDto) {
        const newTask = {id: this.id++, ...request}
        this.tasks.push(newTask);
        return newTask;
    }

    updateTask(id: number, reqeust: UpdateTaskDto) {
        this.tasks = this.tasks.map(task => {
            if(task.id === id) {
                return {...task, ...reqeust}
            }
            return task
        })

        return this.getOneTask(id);
    }


    deleteTask(id: number) {
        let response = this.getOneTask(id);
        
        this.tasks = this.tasks.filter(task => task.id !== id);
        return response;
    }

}
