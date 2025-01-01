import { Encrypter } from '@Application/Cryptography/Encrypter';
import { HashComparer } from '@Application/Cryptography/HashComparer';
import { HashGenerator } from '@Application/Cryptography/HashGenerator';
import { Module } from '@nestjs/common';
import { BcryptHasher } from './BcryptHasher';
import { JwtEncrypter } from './JwtEncrypter';

@Module({
	providers: [
		{
			provide: Encrypter,
			useClass: JwtEncrypter,
		},
		{
			provide: HashComparer,
			useClass: BcryptHasher,
		},
		{
			provide: HashGenerator,
			useClass: BcryptHasher,
		},
	],
	exports: [Encrypter, HashComparer, HashGenerator],
})
export class CryptographyModule {}
