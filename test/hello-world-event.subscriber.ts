import { Subscriber } from '../src/subscriber';
import { Test } from './event-bus-test';

import { HelloWorldEvent } from './hello-world.event';
import { HelloWorldMessage } from './hello-world.message';

export class HelloWorldEventSubscriber extends Subscriber<HelloWorldEvent> {
    constructor() {
        super(HelloWorldEvent);
        this.callback = async (msg: HelloWorldMessage): Promise<void> => {
            Test.MSG = `Hello ${msg?.name ? msg.name : 'World'}!`;
            Test.COUNT++;
        };
    }
}
