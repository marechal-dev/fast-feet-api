import { env } from '@Config/env';
import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpStatus,
	Logger,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { ZodValidationException } from 'nestjs-zod';
import { fromZodError } from 'zod-validation-error';

@Catch(ZodValidationException)
export class ZodValidationExceptionFilter implements ExceptionFilter {
	private readonly logger: Logger = new Logger(
		ZodValidationExceptionFilter.name,
	);

	public catch(exception: ZodValidationException, host: ArgumentsHost) {
		const reply = host.switchToHttp().getResponse<FastifyReply>();
		const zodError = exception.getZodError();

		if (env.NODE_ENV === 'development') {
			this.logger.debug(zodError);
		}

		return reply.status(HttpStatus.BAD_REQUEST).send({
			status: 'Bad Request',
			message: 'Invalid payload',
			errors: fromZodError(zodError),
		});
	}
}
