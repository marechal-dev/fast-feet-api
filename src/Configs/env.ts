import 'dotenv/config';

import { z } from 'zod';

export const envSchemaValidator = z.object({
	DATABASE_URL: z.string().url(),
	NODE_ENV: z
		.enum(['development', 'test', 'production'] as const)
		.default('production'),
	PORT: z.coerce.number().default(3000),
	JWT_ISSUER: z.string(),
	JWT_SECRET: z.string().base64(),
	REDIS_HOST: z.string().default('127.0.0.1'),
	REDIS_PORT: z.coerce.number().default(6379),
	REDIS_DB: z.coerce.number().default(0),
});

const validation = envSchemaValidator.safeParse(process.env);

if (!validation.success) {
	throw new Error(`Incorrect Environment Variables\n${process.env}`);
}

export const env = validation.data;
