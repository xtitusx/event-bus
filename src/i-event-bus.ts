import { Event } from './event';
import { ISubscriber } from './i-subscriber';

export interface ISubscription {
    id: string;
    eventName: string;
    unsubscribe: () => void;
}

export interface ICallable {
    [key: string]: { callback: Function; once: boolean };
}

export interface ISubscribersByEvent {
    [key: string]: ICallable;
}

export interface IEventBus {
    subscribe<T extends Event>(subscriber: ISubscriber<T>): ISubscription;
    once<T extends Event>(subscriber: ISubscriber<T>): IEventBus;
    publish<T>(event: Event, arg?: T): void;
}
