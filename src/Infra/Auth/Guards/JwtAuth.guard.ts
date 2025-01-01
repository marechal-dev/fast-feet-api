import { env } from '@Config/env';
import {
	type CanActivate,
	type ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import type { Reflector } from '@nestjs/core';
import type { JwtService } from '@nestjs/jwt';
import type { FastifyRequest } from 'fastify';

import { IS_PUBLIC_KEY } from '../Decorators/IsPublicRoute.decorator';

@Injectable()
export class JwtAuthGuard implements CanActivate {
	public constructor(
		private readonly reflector: Reflector,
		private readonly jwt: JwtService,
	) {}

	public async canActivate(context: ExecutionContext) {
		const isPublicRoute = this.reflector.getAllAndOverride<boolean>(
			IS_PUBLIC_KEY,
			[context.getHandler(), context.getClass()],
		);

		if (isPublicRoute) {
			return true;
		}

		const request = context.switchToHttp().getRequest<FastifyRequest>();
		const authorizationHeaderValue = request.headers.authorization;

		if (!authorizationHeaderValue) {
			throw new UnauthorizedException();
		}

		const [_, token] = authorizationHeaderValue.split(' ');

		try {
			const payload = await this.jwt.verifyAsync<UserPayload>(token, {
				secret: Buffer.from(env.JWT_SECRET, 'base64'),
			});

			request.user = payload;
		} catch {
			throw new UnauthorizedException();
		}

		return true;
	}
}
