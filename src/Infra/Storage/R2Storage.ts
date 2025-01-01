import { type UploadParams, Uploader } from '@Application/Storage/Uploader';

import { randomUUID } from 'node:crypto';
import { env } from '@Config/env';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';

@Injectable()
export class R2Storage extends Uploader {
	private readonly client: S3Client;

	public constructor() {
		super();

		const accountId = env.CLOUDFLARE_ACCOUNT_ID;

		this.client = new S3Client({
			endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
			region: 'auto',
			credentials: {
				accessKeyId: env.AWS_ACCESS_KEY_ID,
				secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
			},
		});
	}

	public async upload({
		fileName,
		fileType,
		body,
	}: UploadParams): Promise<{ url: string }> {
		const uploadId = randomUUID();
		const uniqueFileName = `${uploadId}-${fileName}`;

		await this.client.send(
			new PutObjectCommand({
				Bucket: env.AWS_BUCKET_NAME,
				Key: uniqueFileName,
				ContentType: fileType,
				Body: body,
			}),
		);

		return {
			url: uniqueFileName,
		};
	}
}
