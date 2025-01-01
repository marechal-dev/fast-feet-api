import { AggregateRoot } from '@Core/Entities/AggregateRoot';
import type { LegalDocument } from '@Domain/ValueObjects/LegalDocument';

export type DeliveryManProps = {
	legalDocument: LegalDocument;
};

export class DeliveryMan extends AggregateRoot<DeliveryManProps> {}
