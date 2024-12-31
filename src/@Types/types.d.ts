/* eslint-disable @typescript-eslint/no-unused-vars */
import fastify from 'fastify';

declare global {
	type Role = 'Admin' | 'DeliveryMan';

	type UserPayload = {
		sub: string;
		legalDocument: string;
		kind: Role;
	};
}

declare module 'fastify' {
	export interface FastifyRequest {
		user?: UserPayload;
	}
}