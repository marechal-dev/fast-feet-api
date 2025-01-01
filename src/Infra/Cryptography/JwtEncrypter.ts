import type { Encrypter } from '@Application/Cryptography/Encrypter';
import { Injectable } from '@nestjs/common';
import type { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtEncrypter implements Encrypter {
	public constructor(private readonly jwtService: JwtService) {}

	public encrypt(payload: Record<string, unknown>): Promise<string> {
		return this.jwtService.signAsync(payload);
	}
}
