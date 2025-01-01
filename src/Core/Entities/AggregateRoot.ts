import type { IDomainEvent } from '../Events/DomainEvent';
import { DomainEvents } from '../Events/DomainEvents';

import { Entity } from './Entity';

export abstract class AggregateRoot<TProps> extends Entity<TProps> {
	private _domainEvents: IDomainEvent[] = [];

	get domainEvents() {
		return this._domainEvents;
	}

	protected addDomainEvent(domainEvent: IDomainEvent): void {
		this._domainEvents.push(domainEvent);
		DomainEvents.markAggregateForDispatch(this);
	}

	public clearEvents(): void {
		this._domainEvents = [];
	}
}
