import type { IDomainException } from '@Core/Exceptions/DomainException';

export class InvalidDocumentException
	extends Error
	implements IDomainException
{
	public constructor(document?: string | null) {
		let documentString = document;

		if (document === null) {
			documentString = '<Null>';
		} else if (document === undefined) {
			documentString = '<Undefined>';
		} else if (document.length === 0) {
			documentString = '<EmptyString>';
		}

		super(
			`The provided document (${documentString}) is invalid, please check your input and try again.`,
		);
	}
}
