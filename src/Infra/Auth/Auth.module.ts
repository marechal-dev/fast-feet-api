import { env } from '@Config/env';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

import { JwtAuthGuard } from './Guards/JwtAuth.guard';

@Module({
	imports: [
		JwtModule.registerAsync({
			global: true,
			useFactory: () => {
				const issuer = env.JWT_ISSUER;

				return {
					signOptions: {
						issuer,
					},
					secret: Buffer.from(env.JWT_SECRET, 'base64'),
				};
			},
		}),
	],
	providers: [
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard,
		},
	],
})
export class AuthModule {}
