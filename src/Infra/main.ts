import { NestFactory } from '@nestjs/core';
import {
	FastifyAdapter,
	type NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

import { setupSwagger } from '@Config/Development/Swagger';
import { env } from '@Config/env';
import { ZodValidationExceptionFilter } from '@Infra/ExceptionFilters/ZodValidationException.filter';

async function bootstrap() {
	const appHost = '0.0.0.0';

	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter(),
	);

	app.useGlobalFilters(new ZodValidationExceptionFilter());

	if (env.NODE_ENV === 'development') {
		setupSwagger(app);
	}

	await app.listen(env.PORT, appHost);
}

bootstrap();
