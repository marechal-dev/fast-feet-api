import type { AggregateRoot } from '../Entities/AggregateRoot';
import type { UniqueEntityID } from '../Entities/UniqueEntityID';

import type { IDomainEvent } from './DomainEvent';

type DomainEventCallback = (event: unknown) => void;

export class DomainEvents {
	private static handlersMap: Record<string, DomainEventCallback[]> = {};
	private static markedAggregates: AggregateRoot<unknown>[] = [];

	public static shouldRun = true;

	public static markAggregateForDispatch(aggregate: AggregateRoot<unknown>) {
		const aggregateFound = !!DomainEvents.findMarkedAggregateByID(aggregate.id);

		if (!aggregateFound) {
			DomainEvents.markedAggregates.push(aggregate);
		}
	}

	private static dispatchAggregateEvents(aggregate: AggregateRoot<unknown>) {
		for (const domainEvent of aggregate.domainEvents) {
			DomainEvents.dispatch(domainEvent);
		}
	}

	private static removeAggregateFromMarkedDispatchList(
		aggregate: AggregateRoot<unknown>,
	) {
		const index = DomainEvents.markedAggregates.findIndex((a) =>
			a.equals(aggregate),
		);

		DomainEvents.markedAggregates.splice(index, 1);
	}

	private static findMarkedAggregateByID(
		id: UniqueEntityID,
	): AggregateRoot<unknown> | undefined {
		return DomainEvents.markedAggregates.find((aggregate) =>
			aggregate.id.equals(id),
		);
	}

	public static dispatchEventsForAggregate(id: UniqueEntityID) {
		const aggregate = DomainEvents.findMarkedAggregateByID(id);

		if (aggregate) {
			DomainEvents.dispatchAggregateEvents(aggregate);
			aggregate.clearEvents();
			DomainEvents.removeAggregateFromMarkedDispatchList(aggregate);
		}
	}

	public static register(
		callback: DomainEventCallback,
		eventClassName: string,
	) {
		const wasEventRegisteredBefore = eventClassName in DomainEvents.handlersMap;

		if (!wasEventRegisteredBefore) {
			DomainEvents.handlersMap[eventClassName] = [];
		}

		DomainEvents.handlersMap[eventClassName].push(callback);
	}

	public static clearHandlers() {
		DomainEvents.handlersMap = {};
	}

	public static clearMarkedAggregates() {
		DomainEvents.markedAggregates = [];
	}

	private static dispatch(event: IDomainEvent) {
		if (!DomainEvents.shouldRun) {
			return;
		}

		const eventClassName: string = event.constructor.name;

		const isEventRegistered = eventClassName in DomainEvents.handlersMap;

		if (isEventRegistered) {
			const handlers = DomainEvents.handlersMap[eventClassName];

			for (const handler of handlers) {
				handler(event);
			}
		}
	}
}
