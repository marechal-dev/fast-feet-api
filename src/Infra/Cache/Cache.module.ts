import { Module } from '@nestjs/common';

import { RedisService } from './Redis/Redis.service';
import { CacheRepository } from '@Application/Repositories/CacheRepository';

@Module({
	providers: [RedisService],
	exports: [CacheRepository],
})
export class CacheModule {}
