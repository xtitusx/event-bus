import { Event } from './event';

export interface ISubscriber<T extends Event> {
    event: new () => T;
    callback: Function;

    /**
     * Implements callback function.
     */
    implCallback(): Function;
}

export abstract class Subscriber<T extends Event> implements ISubscriber<T> {
    event: new () => T;
    callback: Function;

    constructor(event: new () => T) {
        this.event = event;
        this.callback = this.implCallback();
    }

    public abstract implCallback(): Function;
}
