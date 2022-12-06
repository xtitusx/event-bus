import { v4 as uuidv4 } from 'uuid';

import { Event } from './event';
import { ISubscriber } from './subscriber';

export interface ISubscription {
    id: string;
    eventName: string;
    unsubscribe: () => void;
}

interface ICallable {
    [key: string]: { callback: Function; once: boolean };
}

interface ISubscribersByEvent {
    [key: string]: ICallable;
}

export interface IEventBus {
    subscribe<T extends Event>(subscriber: ISubscriber<T>): ISubscription;
    once<T extends Event>(subscriber: ISubscriber<T>): IEventBus;
    publish<T>(event: Event, arg?: T): void;
    clear(): void;
}

export class EventBus implements IEventBus {
    private subscribersByEvent: ISubscribersByEvent;

    public constructor() {
        this.subscribersByEvent = {};
    }

    /**
     * Adds a subscriber for the specified event. No checks are made to see if the subscriber has already been added.
     *
     * Multiple calls passing the same combination of event and subscriber will result in the subscriber being added multiple times.
     * @override
     * @param subscriber
     */
    public subscribe<T extends Event>(subscriber: ISubscriber<T>): ISubscription {
        const eventName = subscriber.event.name;
        const id = this.getNextId();

        if (!this.subscribersByEvent[eventName]) {
            this.subscribersByEvent[eventName] = {};
        }

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

    /**
     * Adds a one time subscriber to the event. This subscriber is invoked only the next time the event is fired, after which it is removed.
     * @override
     * @remarks Chainable method.
     * @param subscriber
     */
    public once<T extends Event>(subscriber: ISubscriber<T>): this {
        const eventName = subscriber.event.name;
        const id = this.getNextId();

        if (!this.subscribersByEvent[eventName]) {
            this.subscribersByEvent[eventName] = {};
        }

        this.subscribersByEvent[eventName][id] = { callback: subscriber.callback, once: true };

        return this;
    }

    /**
     * Executes each of the subscribers for the specified event.
     * @override
     * @param event
     * @param message
     */
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

    /**
     * Removes all subscribers.
     * @override
     */
    public clear(): void {
        this.subscribersByEvent = {};
    }

    private getNextId(): string {
        return uuidv4();
    }
}
