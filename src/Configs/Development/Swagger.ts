import type { NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { patchNestJsSwagger } from 'nestjs-zod';

export function setupSwagger(app: NestFastifyApplication) {
	patchNestJsSwagger();

	const config = new DocumentBuilder()
		.setTitle('FastFeet API')
		.setDescription(
			'API for controlling orders from a fictitious carrier, FastFeet.',
		)
		.setContact(
			'Pietro Piva Vieira',
			'https://github.com/marechal-dev',
			'pietro.developer@gmail.com',
		)
		.setVersion('1.0')
		.addBearerAuth()
		.addTag('Authentication')
		.addTag('Admin')
		.addTag('Delivery Man')
		.addTag('Delivery')
		.addTag('Recipient')
		.build();

	const document = SwaggerModule.createDocument(app, config);

	SwaggerModule.setup('docs', app, document);
}
