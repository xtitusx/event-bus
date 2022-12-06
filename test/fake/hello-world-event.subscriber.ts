import { Subscriber } from '../../src/subscriber';

import { Test } from '../event-bus-test';
import { HelloWorldEvent } from './hello-world.event';
import { HelloWorldMessage } from './hello-world.message';

export class HelloWorldEventSubscriber extends Subscriber<HelloWorldEvent> {
    constructor() {
        super(HelloWorldEvent);
    }

    /**
     * @override
     */
    public implCallback(): Function {
        return async (message: HelloWorldMessage): Promise<void> => {
            Test.MESSAGE = `Hello ${message?.name ?? 'World'}!`;
            Test.COUNT++;
        };
    }
}
