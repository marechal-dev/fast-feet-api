import { Uploader } from '@Application/Storage/Uploader';
import { Module } from '@nestjs/common';
import { R2Storage } from './R2Storage';

@Module({
	providers: [
		{
			provide: Uploader,
			useClass: R2Storage,
		},
	],
	exports: [Uploader],
})
export class StorageModule {}
