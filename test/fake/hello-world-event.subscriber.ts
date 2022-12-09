import { Subscriber } from '../../src/subscriber';

import { Fake } from './fake';
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
            Fake.MESSAGE = `Hello ${message?.name ?? 'World'}!`;
            Fake.COUNT++;
        };
    }
}
