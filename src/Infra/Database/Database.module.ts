import { CacheModule } from '@Infra/Cache/Cache.module';
import { Module } from '@nestjs/common';

import { PrismaService } from './Prisma/Prisma.service';

@Module({
	imports: [CacheModule],
	providers: [PrismaService],
	exports: [PrismaService],
})
export class DatabaseModule {}
