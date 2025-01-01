import 'dotenv/config';

import { z } from 'zod';

export const envSchemaValidator = z.object({
	NODE_ENV: z
		.enum(['development', 'test', 'production'] as const)
		.default('production'),
	PORT: z.coerce.number().default(3000),
	JWT_ISSUER: z.string(),
	JWT_SECRET: z.string().base64(),
	DATABASE_URL: z.string().url(),
	REDIS_HOST: z
		.string()
		.ip({
			version: 'v4',
		})
		.default('127.0.0.1'),
	REDIS_PORT: z.coerce.number().default(6379),
	REDIS_DB: z.coerce.number().default(0),
	CLOUDFLARE_ACCOUNT_ID: z.string(),
	AWS_ACCESS_KEY_ID: z.string(),
	AWS_SECRET_ACCESS_KEY: z.string(),
	AWS_BUCKET_NAME: z.string(),
});

const validation = envSchemaValidator.safeParse(process.env);

if (!validation.success) {
	throw new Error(`Incorrect Environment Variables\n${process.env}`);
}

export const env = validation.data;
