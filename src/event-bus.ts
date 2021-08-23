import { v4 as uuidv4 } from 'uuid';
import { Tyr } from '@xtitusx/type-guard';

import { Event } from './event';
import { IEventBus, ISubscription, ISubscribersByEvent } from './i-event-bus';
import { ISubscriber } from './i-subscriber';

export class EventBus implements IEventBus {
    private subscribersByEvent: ISubscribersByEvent;

    public constructor() {
        this.subscribersByEvent = {};
    }

    /**
     * Adds a subscriber for the specified event. No checks are made to see if the subscriber has already been added. Multiple calls passing the same combination of event and subscriber will result in the subscriber being added multiple times.
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

                if (Tyr.array().isEmpty().guard(Object.keys(this.subscribersByEvent[eventName])).isSuccess()) {
                    delete this.subscribersByEvent[eventName];
                }
            },
        };
    }

    /**
     * Adds a one time subscriber to the event. This subscriber is invoked only the next time the event is fired, after which it is removed.
     * @override
     * @param subscriber
     */
    public once<T extends Event>(subscriber: ISubscriber<T>): void {
        const eventName = subscriber.event.name;
        const id = this.getNextId();

        if (!this.subscribersByEvent[eventName]) {
            this.subscribersByEvent[eventName] = {};
        }

        this.subscribersByEvent[eventName][id] = { callback: subscriber.callback, once: true };
    }

    /**
     * Executes each of the subscribers for the specified event.
     * @override
     * @param event
     * @param arg
     */
    public publish<T>(event: Event, arg?: T): void {
        const eventSubscribers = this.subscribersByEvent[event.name];

        if (Tyr.nil().isUndefined().guard(eventSubscribers).isSuccess()) {
            return;
        }

        for (const id in eventSubscribers) {
            const eventSubscriber = eventSubscribers[id];
            eventSubscriber.callback(arg);

            if (eventSubscriber.once === true) {
                delete eventSubscribers[id];
            }
        }

        if (Tyr.array().isEmpty().guard(Object.keys(this.subscribersByEvent[event.name])).isSuccess()) {
            delete this.subscribersByEvent[event.name];
        }
    }

    private getNextId(): string {
        return uuidv4();
    }
}
