import {
	type CanActivate,
	type ExecutionContext,
	Injectable,
} from '@nestjs/common';
import type { Reflector } from '@nestjs/core';
import type { FastifyRequest } from 'fastify';

@Injectable()
export class RolesGuard implements CanActivate {
	public constructor(private readonly reflector: Reflector) {}

	public canActivate(ctx: ExecutionContext): boolean {
		const roles = this.reflector.get<Role[]>('roles', ctx.getHandler());
		if (!roles || roles.length === 0) {
			return true;
		}

		const request = ctx.switchToHttp().getRequest<FastifyRequest>();
		const user = request.user;
		if (!user) {
			return false;
		}

		return this.rolesMatch(roles, user.kind);
	}

	private rolesMatch(roles: Role[], userRole: Role): boolean {
		return !!roles.find((role) => role === userRole);
	}
}
