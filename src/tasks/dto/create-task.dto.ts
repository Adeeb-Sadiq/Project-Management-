import { IsNotEmpty, IsString } from "class-validator"

export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    title: string

    description: string

    @IsNotEmpty()
    user: number

    comments: string

    @IsNotEmpty()
    board: string

    dueDate: string
}
