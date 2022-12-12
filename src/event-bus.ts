import { Event } from './event';
import { ISubscriber } from './subscriber';

export interface ISubscription {
    id: string;
    eventName: string;
    /**
     * Removes the subscriber for the specified event.
     */
    unsubscribe: () => void;
}

export interface IEventBus {
    /**
     * Adds a subscriber for the specified event. No checks are made to see if the subscriber has already been added.
     *
     * Multiple calls passing the same combination of event and subscriber will result in the subscriber being added multiple times.
     * @override
     * @param event
     * @param subscriber
     */
    subscribe(event: Event, subscriber: ISubscriber): ISubscription;

    /**
     * Adds a one time subscriber to the event. This subscriber is invoked only the next time the event is fired, after which it is removed.
     * @override
     * @remarks Chainable method.
     * @param event
     * @param subscriber
     */
    once(event: Event, subscriber: ISubscriber): IEventBus;

    /**
     * Executes each of the subscribers for the specified event.
     * @override
     * @param event
     * @param message
     */
    publish<T>(event: Event, message?: T): void;

    /**
     * Removes all subscribers.
     * @override
     */
    clear(): void;
}

interface ISubscribersByEvent {
    [key: string]: {
        [key: string]: { callback: Function; once: boolean };
    };
}

export class EventBus implements IEventBus {
    private static INSTANCE: EventBus;
    private static readonly MAX_ID = 99;

    private subscribersByEvent: ISubscribersByEvent;
    private count = 0;

    public constructor() {
        this.subscribersByEvent = {};
    }

    /**
     * Keep the constructor public
     */
    public static getInstance(): EventBus {
        if (!EventBus.INSTANCE) {
            EventBus.INSTANCE = new EventBus();
        }

        return EventBus.INSTANCE;
    }

    public subscribe(event: Event, subscriber: ISubscriber): ISubscription {
        const eventName = event.name;
        const id = this.getNextId();

        this.initEventMap(eventName);

        this.subscribersByEvent[eventName][id] = { callback: subscriber.callback, once: false };

        return {
            id: id,
            eventName: eventName,
            unsubscribe: (): void => {
                delete this.subscribersByEvent[eventName][id];

                if (Object.keys(this.subscribersByEvent[eventName]).length === 0) {
                    delete this.subscribersByEvent[eventName];
                }
            },
        };
    }

    public once(event: Event, subscriber: ISubscriber): this {
        const eventName = event.name;
        const id = this.getNextId();

        this.initEventMap(eventName);

        this.subscribersByEvent[eventName][id] = { callback: subscriber.callback, once: true };

        return this;
    }

    public publish<T>(event: Event, message?: T): void {
        const eventSubscribers = this.subscribersByEvent[event.name];

        if (eventSubscribers === undefined) {
            return;
        }

        for (const id in eventSubscribers) {
            const eventSubscriber = eventSubscribers[id];
            eventSubscriber.callback(message);

            if (eventSubscriber.once === true) {
                delete eventSubscribers[id];
            }
        }
        if (Object.keys(this.subscribersByEvent[event.name]).length === 0) {
            delete this.subscribersByEvent[event.name];
        }
    }

    public clear(): void {
        this.subscribersByEvent = {};
    }

    private initEventMap(eventName: string): void {
        if (!this.subscribersByEvent[eventName]) {
            this.subscribersByEvent[eventName] = {};
        }
    }

    private getNextId(): string {
        return `${new Date().toISOString()}-${(this.count = this.count < EventBus.MAX_ID ? ++this.count : 1)}`;
    }
}
