import { Subscriber } from '../../src/subscriber';

import { Fake } from './fake';
import { HelloWorldMessage } from './hello-world.message';

type EventNumber = 1 | 2;

export class HelloWorldEventSubscriber extends Subscriber {
    private eventNumber: EventNumber;

    constructor(eventNumber: EventNumber) {
        super();
        this.eventNumber = eventNumber;
    }

    /**
     * @override
     */
    public implCallback(): Function {
        return async (message: HelloWorldMessage): Promise<void> => {
            if (this.eventNumber < 2) {
                Fake.MESSAGE_1 = `Hello ${message?.name ?? 'World'}!`;
                Fake.COUNT_1++;
            } else {
                Fake.MESSAGE_2 = `Hello ${
                    message?.name ?? 'World'
                } and, again, welcome to the Aperture Science computer-aided enrichment center.`;
                Fake.COUNT_2++;
            }
        };
    }
}
