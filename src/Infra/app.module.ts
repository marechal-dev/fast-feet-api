import { Module } from '@nestjs/common';
import { HttpModule } from './Http/Http.module';
import { HeaderResolver, I18nModule } from 'nestjs-i18n';
import path from 'node:path';

@Module({
	imports: [
		I18nModule.forRoot({
			fallbackLanguage: 'en',
			loaderOptions: {
				path: path.join(__dirname, '/I18n/'),
				watch: true,
			},
			resolvers: [new HeaderResolver(['x-lang'])],
		}),
		HttpModule,
	],
})
export class AppModule {}
