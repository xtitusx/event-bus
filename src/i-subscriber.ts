import { Event } from './event';

export interface ISubscriber<T extends Event> {
    event: new () => T;
    callback: Function;
}
