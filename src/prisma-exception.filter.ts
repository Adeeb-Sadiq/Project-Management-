import { ArgumentsHost, Catch, ConflictException, ExceptionFilter, NotFoundException } from "@nestjs/common";
import { Prisma } from "generated/prisma/client";

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter<Prisma.PrismaClientKnownRequestError>{
    catch(
        exception: Prisma.PrismaClientKnownRequestError,
        host: ArgumentsHost,
    ) {
        switch(exception.code) {
            //Code for unique constraints error
            case 'P2002': {
                throw new ConflictException(`Email already exists`)
            }

            //Code for not found records. But this happening is very rare/close to impossible
            case 'P2025': 
                throw new NotFoundException('Record Not Found')
            
            default:
                throw exception
        }
    }
}