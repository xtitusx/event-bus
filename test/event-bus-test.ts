import { assert } from 'chai';

import { EventBus } from '../src/event-bus';

import { HelloWorldEventSubscriber } from './fake/hello-world-event.subscriber';
import { HelloWorldEvent } from './fake/hello-world.event';
import { HelloWorldMessage } from './fake/hello-world.message';

export class Test {
    public static MESSAGE: string;
    public static COUNT = 0;
}

describe('EventBus', () => {
    let eventBus: EventBus;

    beforeEach(() => {
        Test.MESSAGE = undefined;
        eventBus = new EventBus();
    });

    describe('#subscribe()', () => {
        it("shoud assign 'Hello World!' value to 'Test.MSG'", () => {
            eventBus.subscribe(new HelloWorldEventSubscriber());
            eventBus.publish<HelloWorldMessage>(HelloWorldEvent);

            assert.equal(Test.MESSAGE, 'Hello World!');
            assert.equal(Test.COUNT, 1);
        });

        it("shoud assign 'Hello Benjamin!' value to 'Test.MSG'", () => {
            eventBus.subscribe(new HelloWorldEventSubscriber());
            eventBus.publish<HelloWorldMessage>(HelloWorldEvent, {
                name: 'Benjamin',
            });

            assert.equal(Test.MESSAGE, 'Hello Benjamin!');
            assert.equal(Test.COUNT, 2);
        });

        it("shoud assign 'Hello Benjamin!' value to 'Test.MSG'", () => {
            eventBus.subscribe(new HelloWorldEventSubscriber());
            eventBus.publish<HelloWorldMessage>(HelloWorldEvent);
            eventBus.publish<HelloWorldMessage>(HelloWorldEvent, {
                name: 'Benjamin',
            });

            assert.equal(Test.MESSAGE, 'Hello Benjamin!');
            assert.equal(Test.COUNT, 4);
        });
    });

    describe('#unsubscribe()', () => {
        it("shoud assign 'Hello World!' value to 'Test.MSG'", () => {
            const subscription = eventBus.subscribe(new HelloWorldEventSubscriber());
            eventBus.publish<HelloWorldMessage>(HelloWorldEvent);

            assert.equal(Test.MESSAGE, 'Hello World!');
            assert.equal(Test.COUNT, 5);

            subscription.unsubscribe();
            eventBus.publish<HelloWorldMessage>(HelloWorldEvent, {
                name: 'Benjamin',
            });

            assert.equal(Test.MESSAGE, 'Hello World!');
            assert.equal(Test.COUNT, 5);
        });

        it("shoud assign undefined value to 'Test.MSG'", () => {
            eventBus.subscribe(new HelloWorldEventSubscriber()).unsubscribe();
            eventBus.publish<HelloWorldMessage>(HelloWorldEvent);

            assert.equal(Test.MESSAGE, undefined);
            assert.equal(Test.COUNT, 5);
        });
    });

    describe('#once()', () => {
        it("shoud assign 'Hello World!' value to 'Test.MSG'", () => {
            eventBus.once(new HelloWorldEventSubscriber());
            eventBus.publish<HelloWorldMessage>(HelloWorldEvent);

            assert.equal(Test.MESSAGE, 'Hello World!');
            assert.equal(Test.COUNT, 6);
        });

        it("shoud assign 'Hello Benjamin!' value to 'Test.MSG'", () => {
            eventBus.once(new HelloWorldEventSubscriber());
            eventBus.publish<HelloWorldMessage>(HelloWorldEvent, {
                name: 'Benjamin',
            });

            assert.equal(Test.MESSAGE, 'Hello Benjamin!');
            assert.equal(Test.COUNT, 7);
        });

        it("shoud assign 'Hello World!' value to 'Test.MSG'", () => {
            eventBus.once(new HelloWorldEventSubscriber());
            eventBus.publish<HelloWorldMessage>(HelloWorldEvent);
            eventBus.publish<HelloWorldMessage>(HelloWorldEvent, {
                name: 'Benjamin',
            });

            assert.equal(Test.MESSAGE, 'Hello World!');
            assert.equal(Test.COUNT, 8);
        });
    });

    describe('#clear()', () => {
        it("shoud assign 'Hello World!' value to 'Test.MSG'", () => {
            eventBus.subscribe(new HelloWorldEventSubscriber());
            eventBus.clear();
            eventBus.publish<HelloWorldMessage>(HelloWorldEvent);

            assert.equal(Test.MESSAGE, undefined);
            assert.equal(Test.COUNT, 8);
        });
    });
});
