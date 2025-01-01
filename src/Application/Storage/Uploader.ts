export type UploadParams = {
	fileName: string;
	fileType: string;
	body: Buffer;
};

export abstract class Uploader {
	public abstract upload(params: UploadParams): Promise<{
		url: string;
	}>;
}
