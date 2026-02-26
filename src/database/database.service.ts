import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma/client';
import { PrismaPg } from "@prisma/adapter-pg"
import "dotenv/config"
@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit{
    constructor() {
    super({
      adapter: new PrismaPg({
        connectionString: process.env.DATABASE_URL!,
      }),
    });
    }
    async onModuleInit() {
        await this.$connect();
    }
}
