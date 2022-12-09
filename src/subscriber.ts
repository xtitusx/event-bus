export interface ISubscriber {
    callback: Function;

    /**
     * Implements callback function.
     */
    implCallback(): Function;
}

export abstract class Subscriber implements ISubscriber {
    callback: Function;

    constructor() {
        this.callback = this.implCallback();
    }

    public abstract implCallback(): Function;
}
