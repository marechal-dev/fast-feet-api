import { CryptographyModule } from '@Infra/Cryptography/Cryptography.module';
import { DatabaseModule } from '@Infra/Database/Database.module';
import { StorageModule } from '@Infra/Storage/Storage.module';
import { Module } from '@nestjs/common';

@Module({
	imports: [DatabaseModule, CryptographyModule, StorageModule],
	controllers: [],
	providers: [],
})
export class HttpModule {}
