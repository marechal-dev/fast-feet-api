import type { UniqueEntityID } from '../Entities/UniqueEntityID';

export interface IDomainEvent {
	ocurredAt: Date;
	getAggregateId(): UniqueEntityID;
}
