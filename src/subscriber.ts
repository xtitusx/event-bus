import { Event } from './event';
import { ISubscriber } from './i-subscriber';

export class Subscriber<T extends Event> implements ISubscriber<T> {
    event: new () => T;
    callback: Function;

    constructor(event: new () => T) {
        this.event = event;
    }
}
