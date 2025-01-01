import { Injectable } from '@nestjs/common';

import { compare, hash } from 'bcrypt';

import type { HashComparer } from '@Application/Cryptography/HashComparer';
import type { HashGenerator } from '@Application/Cryptography/HashGenerator';

@Injectable()
export class BcryptHasher implements HashGenerator, HashComparer {
	private readonly numberOfRounds = 8;

	public hash(plain: string): Promise<string> {
		return hash(plain, this.numberOfRounds);
	}

	public compare(plain: string, hash: string): Promise<boolean> {
		return compare(plain, hash);
	}
}
