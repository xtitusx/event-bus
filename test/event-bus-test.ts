import { assert } from 'chai';

import { EventBus } from '../src/event-bus';

import { Fake } from './fake/fake';
import { HelloWorldEventSubscriber } from './fake/hello-world-event.subscriber';
import { HelloWorldEvent } from './fake/hello-world.event';
import { HelloWorldMessage } from './fake/hello-world.message';

describe('EventBus', () => {
    let eventBus: EventBus;

    beforeEach(() => {
        Fake.MESSAGE = undefined;
        eventBus = new EventBus();
    });

    describe('#subscribe()', () => {
        it("shoud assign 'Hello World!' value to 'Fake.MESSAGE'", () => {
            eventBus.subscribe(new HelloWorldEventSubscriber());
            eventBus.publish<HelloWorldMessage>(HelloWorldEvent);

            assert.equal(Fake.MESSAGE, 'Hello World!');
            assert.equal(Fake.COUNT, 1);
        });

        it("shoud assign 'Hello Benjamin!' value to 'Fake.MESSAGE'", () => {
            eventBus.subscribe(new HelloWorldEventSubscriber());
            eventBus.publish<HelloWorldMessage>(HelloWorldEvent, {
                name: 'Benjamin',
            });

            assert.equal(Fake.MESSAGE, 'Hello Benjamin!');
            assert.equal(Fake.COUNT, 2);
        });

        it("shoud assign 'Hello Benjamin!' value to 'Fake.MESSAGE'", () => {
            eventBus.subscribe(new HelloWorldEventSubscriber());
            eventBus.publish<HelloWorldMessage>(HelloWorldEvent);
            eventBus.publish<HelloWorldMessage>(HelloWorldEvent, {
                name: 'Benjamin',
            });

            assert.equal(Fake.MESSAGE, 'Hello Benjamin!');
            assert.equal(Fake.COUNT, 4);
        });
    });

    describe('#unsubscribe()', () => {
        it("shoud assign 'Hello World!' value to 'Fake.MESSAGE'", () => {
            const subscription = eventBus.subscribe(new HelloWorldEventSubscriber());
            eventBus.publish<HelloWorldMessage>(HelloWorldEvent);

            assert.equal(Fake.MESSAGE, 'Hello World!');
            assert.equal(Fake.COUNT, 5);

            subscription.unsubscribe();
            eventBus.publish<HelloWorldMessage>(HelloWorldEvent, {
                name: 'Benjamin',
            });

            assert.equal(Fake.MESSAGE, 'Hello World!');
            assert.equal(Fake.COUNT, 5);
        });

        it("shoud assign undefined value to 'Fake.MESSAGE'", () => {
            eventBus.subscribe(new HelloWorldEventSubscriber()).unsubscribe();
            eventBus.publish<HelloWorldMessage>(HelloWorldEvent);

            assert.equal(Fake.MESSAGE, undefined);
            assert.equal(Fake.COUNT, 5);
        });
    });

    describe('#once()', () => {
        it("shoud assign 'Hello World!' value to 'Fake.MESSAGE'", () => {
            eventBus.once(new HelloWorldEventSubscriber());
            eventBus.publish<HelloWorldMessage>(HelloWorldEvent);

            assert.equal(Fake.MESSAGE, 'Hello World!');
            assert.equal(Fake.COUNT, 6);
        });

        it("shoud assign 'Hello Benjamin!' value to 'Fake.MESSAGE'", () => {
            eventBus.once(new HelloWorldEventSubscriber());
            eventBus.publish<HelloWorldMessage>(HelloWorldEvent, {
                name: 'Benjamin',
            });

            assert.equal(Fake.MESSAGE, 'Hello Benjamin!');
            assert.equal(Fake.COUNT, 7);
        });

        it("shoud assign 'Hello World!' value to 'Fake.MESSAGE'", () => {
            eventBus.once(new HelloWorldEventSubscriber());
            eventBus.publish<HelloWorldMessage>(HelloWorldEvent);
            eventBus.publish<HelloWorldMessage>(HelloWorldEvent, {
                name: 'Benjamin',
            });

            assert.equal(Fake.MESSAGE, 'Hello World!');
            assert.equal(Fake.COUNT, 8);
        });
    });

    describe('#clear()', () => {
        it("shoud assign 'Hello World!' value to 'Fake.MESSAGE'", () => {
            eventBus.subscribe(new HelloWorldEventSubscriber());
            eventBus.clear();
            eventBus.publish<HelloWorldMessage>(HelloWorldEvent);

            assert.equal(Fake.MESSAGE, undefined);
            assert.equal(Fake.COUNT, 8);
        });
    });
});
