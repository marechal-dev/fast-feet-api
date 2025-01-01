import { ValueObject } from '@Core/Entities/ValueObject';
import { type Either, left, right } from '@Core/Primitives/Either';
import { InvalidDocumentException } from '@Domain/Exceptions/InvalidDocumentException';

export type LegalDocumentProps = {
	value: string;
};

export class LegalDocument extends ValueObject<LegalDocumentProps> {
	private static readonly VALID_LENGTH = 11;
	private static readonly NO_SPECIAL_CHARACTERS_REGEXP = /^[0-9]{11}$/m;

	public static make(
		props: LegalDocumentProps,
	): Either<InvalidDocumentException, LegalDocument> {
		if (!LegalDocument.isValidDocument(props.value)) {
			return left(new InvalidDocumentException(props.value));
		}

		return right(new LegalDocument(props));
	}

	private static isValidDocument(document: string): boolean {
		const hasValidLength = document.length === LegalDocument.VALID_LENGTH;

		const hasNoSpecialCharacters =
			LegalDocument.NO_SPECIAL_CHARACTERS_REGEXP.test(document);

		return hasValidLength && hasNoSpecialCharacters;
	}

	private constructor(props: LegalDocumentProps) {
		super(props);
	}

	public get value() {
		return this.props.value;
	}

	public override toString() {
		return `LegalDocument::ValueObject::props@{ value: ${this.props.value} }`;
	}
}
