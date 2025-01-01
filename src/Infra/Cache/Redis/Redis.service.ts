import { env } from '@Config/env';
import { Injectable, type OnModuleDestroy } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService extends Redis implements OnModuleDestroy {
	public constructor() {
		super({
			host: env.REDIS_HOST,
			port: env.REDIS_PORT,
			db: env.REDIS_DB,
		});
	}

	public onModuleDestroy() {
		return this.disconnect();
	}
}
