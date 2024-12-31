import { NestFactory } from '@nestjs/core';
import {
	FastifyAdapter,
	type NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

import { env } from '@Config/env';
import { ZodValidationExceptionFilter } from '@Infra/ExceptionFilters/ZodValidationException.filter';
import { setupSwagger } from '@Config/Development/Swagger';

async function bootstrap() {
	const APP_HOST = '0.0.0.0';

	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter(),
	);

	app.setGlobalPrefix('/api');
	app.useGlobalFilters(new ZodValidationExceptionFilter());

	if (env.NODE_ENV === 'development') {
		setupSwagger(app);
	}

	await app.listen(env.PORT, APP_HOST);
}

bootstrap();
