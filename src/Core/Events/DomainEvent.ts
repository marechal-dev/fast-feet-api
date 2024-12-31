import { UniqueEntityID } from '../Entities/UniqueEntityID';

export interface DomainEvent {
  ocurredAt: Date;
  getAggregateId(): UniqueEntityID;
}
