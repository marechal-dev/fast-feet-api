import { Entity } from '@Core/Entities/Entity';
import type { UniqueEntityID } from '@Core/Entities/UniqueEntityID';

export type AttachmentProps = {
	title: string;
	url: string;
};

export class Attachment extends Entity<AttachmentProps> {
	public get title() {
		return this.props.title;
	}

	public get url() {
		return this.props.url;
	}

	public static create(props: AttachmentProps, id?: UniqueEntityID) {
		const attachment = new Attachment(props, id);

		return attachment;
	}
}
