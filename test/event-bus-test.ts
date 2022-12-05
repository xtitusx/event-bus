import { assert } from 'chai';

import { EventBus } from '../src/event-bus';

import { HelloWorldEventSubscriber } from './hello-world-event.subscriber';
import { HelloWorldEvent } from './hello-world.event';
import { HelloWorldMessage } from './hello-world.message';

export class Test {
    public static MSG: string;
    public static COUNT = 0;
}

describe('EventBus', () => {
    let eventBus: EventBus;

    beforeEach(() => {
        Test.MSG = undefined;
        eventBus = new EventBus();
    });

    describe('#subscribe()', () => {
        it("shoud assign 'Hello World!' value to 'Test.MSG'", () => {
            eventBus.subscribe(new HelloWorldEventSubscriber());
            eventBus.publish<HelloWorldMessage>(HelloWorldEvent);

            assert.equal(Test.MSG, 'Hello World!');
            assert.equal(Test.COUNT, 1);
        });

        it("shoud assign 'Hello Benjamin!' value to 'Test.MSG'", () => {
            eventBus.subscribe(new HelloWorldEventSubscriber());
            eventBus.publish<HelloWorldMessage>(HelloWorldEvent, {
                name: 'Benjamin',
            });

            assert.equal(Test.MSG, 'Hello Benjamin!');
            assert.equal(Test.COUNT, 2);
        });

        it("shoud assign 'Hello Benjamin!' value to 'Test.MSG'", () => {
            eventBus.subscribe(new HelloWorldEventSubscriber());
            eventBus.publish<HelloWorldMessage>(HelloWorldEvent);
            eventBus.publish<HelloWorldMessage>(HelloWorldEvent, {
                name: 'Benjamin',
            });

            assert.equal(Test.MSG, 'Hello Benjamin!');
            assert.equal(Test.COUNT, 4);
        });
    });

    describe('#unsubscribe()', () => {
        it("shoud assign 'Hello World!' value to 'Test.MSG'", () => {
            const subcription = eventBus.subscribe(new HelloWorldEventSubscriber());
            eventBus.publish<HelloWorldMessage>(HelloWorldEvent);

            assert.equal(Test.MSG, 'Hello World!');
            assert.equal(Test.COUNT, 5);

            subcription.unsubscribe();
            eventBus.publish<HelloWorldMessage>(HelloWorldEvent, {
                name: 'Benjamin',
            });

            assert.equal(Test.MSG, 'Hello World!');
            assert.equal(Test.COUNT, 5);
        });
    });

    describe('#once()', () => {
        it("shoud assign 'Hello World!' value to 'Test.MSG'", () => {
            eventBus.once(new HelloWorldEventSubscriber());
            eventBus.publish<HelloWorldMessage>(HelloWorldEvent);

            assert.equal(Test.MSG, 'Hello World!');
            assert.equal(Test.COUNT, 6);
        });

        it("shoud assign 'Hello Benjamin!' value to 'Test.MSG'", () => {
            eventBus.once(new HelloWorldEventSubscriber());
            eventBus.publish<HelloWorldMessage>(HelloWorldEvent, {
                name: 'Benjamin',
            });

            assert.equal(Test.MSG, 'Hello Benjamin!');
            assert.equal(Test.COUNT, 7);
        });

        it("shoud assign 'Hello World!' value to 'Test.MSG'", () => {
            eventBus.once(new HelloWorldEventSubscriber());
            eventBus.publish<HelloWorldMessage>(HelloWorldEvent);
            eventBus.publish<HelloWorldMessage>(HelloWorldEvent, {
                name: 'Benjamin',
            });

            assert.equal(Test.MSG, 'Hello World!');
            assert.equal(Test.COUNT, 8);
        });
    });
});
