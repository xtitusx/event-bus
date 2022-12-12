import { assert } from 'chai';

import { EventBus } from '../src/event-bus';

import { Fake } from './fake/fake';
import { HelloGladosEvent } from './fake/hello-glados.event';
import { HelloWorldEventSubscriber } from './fake/hello-world-event.subscriber';
import { HelloWorldEvent } from './fake/hello-world.event';
import { HelloWorldMessage } from './fake/hello-world.message';

describe('EventBus', () => {
    let eventBus: EventBus;

    beforeEach(() => {
        Fake.MESSAGE_1 = undefined;
        Fake.MESSAGE_2 = undefined;
        eventBus = new EventBus();
    });

    describe('#subscribe()', () => {
        it("shoud assign 'Hello World!' value to 'Fake.MESSAGE_1'", () => {
            eventBus.subscribe(HelloWorldEvent, new HelloWorldEventSubscriber(1));
            eventBus.publish(HelloWorldEvent);

            assert.equal(Fake.MESSAGE_1, 'Hello World!');
            assert.equal(Fake.COUNT_1, 1);
        });

        it("shoud assign 'Hello Benjamin!' value to 'Fake.MESSAGE_1'", () => {
            eventBus.subscribe(HelloWorldEvent, new HelloWorldEventSubscriber(1));
            eventBus.publish<HelloWorldMessage>(HelloWorldEvent, {
                name: 'Benjamin',
            });

            assert.equal(Fake.MESSAGE_1, 'Hello Benjamin!');
            assert.equal(Fake.COUNT_1, 2);
        });

        it("shoud assign 'Hello Benjamin!' value to 'Fake.MESSAGE_1'", () => {
            eventBus.subscribe(HelloWorldEvent, new HelloWorldEventSubscriber(1));
            eventBus.publish(HelloWorldEvent);
            eventBus.publish<HelloWorldMessage>(HelloWorldEvent, {
                name: 'Benjamin',
            });

            assert.equal(Fake.MESSAGE_1, 'Hello Benjamin!');
            assert.equal(Fake.COUNT_1, 4);
        });

        it("shoud assign 'Hello Benjamin!' value to 'Fake.MESSAGE_1'", () => {
            eventBus.subscribe(HelloWorldEvent, new HelloWorldEventSubscriber(1));
            eventBus.publish(HelloWorldEvent);
            eventBus.publish<HelloWorldMessage>(HelloWorldEvent, {
                name: 'Benjamin',
            });

            assert.equal(Fake.MESSAGE_1, 'Hello Benjamin!');
            assert.equal(Fake.COUNT_1, 6);
        });

        it("shoud assign 'Hello Benjamin and, again, welcome to the Aperture Science computer-aided enrichment center.'' value to 'Fake.MESSAGE_2'", () => {
            eventBus.subscribe(HelloGladosEvent, new HelloWorldEventSubscriber(2));
            eventBus.publish<HelloWorldMessage>(HelloGladosEvent, {
                name: 'Benjamin',
            });

            assert.equal(Fake.MESSAGE_1, undefined);
            assert.equal(Fake.COUNT_1, 6);
            assert.equal(
                Fake.MESSAGE_2,
                'Hello Benjamin and, again, welcome to the Aperture Science computer-aided enrichment center.'
            );
            assert.equal(Fake.COUNT_2, 1);
        });
    });

    describe('#unsubscribe()', () => {
        it("shoud assign 'Hello World!' value to 'Fake.MESSAGE_1'", () => {
            const subscription = eventBus.subscribe(HelloWorldEvent, new HelloWorldEventSubscriber(1));
            eventBus.publish(HelloWorldEvent);

            assert.equal(Fake.MESSAGE_1, 'Hello World!');
            assert.equal(Fake.COUNT_1, 7);

            subscription.unsubscribe();
            eventBus.publish<HelloWorldMessage>(HelloWorldEvent, {
                name: 'Benjamin',
            });

            assert.equal(Fake.MESSAGE_1, 'Hello World!');
            assert.equal(Fake.COUNT_1, 7);
        });

        it("shoud assign undefined value to 'Fake.MESSAGE_1'", () => {
            eventBus.subscribe(HelloWorldEvent, new HelloWorldEventSubscriber(1)).unsubscribe();
            eventBus.publish(HelloWorldEvent);

            assert.equal(Fake.MESSAGE_1, undefined);
            assert.equal(Fake.COUNT_1, 7);
        });
    });

    describe('#once()', () => {
        it("shoud assign 'Hello World!' value to 'Fake.MESSAGE_1'", () => {
            eventBus.once(HelloWorldEvent, new HelloWorldEventSubscriber(1));
            eventBus.publish(HelloWorldEvent);

            assert.equal(Fake.MESSAGE_1, 'Hello World!');
            assert.equal(Fake.COUNT_1, 8);
        });

        it("shoud assign 'Hello Benjamin!' value to 'Fake.MESSAGE_1'", () => {
            eventBus.once(HelloWorldEvent, new HelloWorldEventSubscriber(1));
            eventBus.publish<HelloWorldMessage>(HelloWorldEvent, {
                name: 'Benjamin',
            });

            assert.equal(Fake.MESSAGE_1, 'Hello Benjamin!');
            assert.equal(Fake.COUNT_1, 9);
        });

        it("shoud assign 'Hello World!' value to 'Fake.MESSAGE_1'", () => {
            eventBus.once(HelloWorldEvent, new HelloWorldEventSubscriber(1));
            eventBus.publish(HelloWorldEvent);
            eventBus.publish<HelloWorldMessage>(HelloWorldEvent, {
                name: 'Benjamin',
            });

            assert.equal(Fake.MESSAGE_1, 'Hello World!');
            assert.equal(Fake.COUNT_1, 10);
        });
    });

    describe('#clear()', () => {
        it("shoud assign 'Hello World!' value to 'Fake.MESSAGE_1'", () => {
            eventBus.subscribe(HelloWorldEvent, new HelloWorldEventSubscriber(1));
            eventBus.clear();
            eventBus.publish(HelloWorldEvent);

            assert.equal(Fake.MESSAGE_1, undefined);
            assert.equal(Fake.COUNT_1, 10);
        });
    });

    describe('#getInstance()', () => {
        it("shoud assign 'Hello World!' value to 'Fake.MESSAGE_1'", () => {
            EventBus.getInstance().subscribe(HelloWorldEvent, new HelloWorldEventSubscriber(1));
            EventBus.getInstance().publish(HelloWorldEvent);

            assert.equal(Fake.MESSAGE_1, 'Hello World!');
            assert.equal(Fake.COUNT_1, 11);
        });

        it("shoud assign 'Hello Benjamin!' value to 'Fake.MESSAGE_1'", () => {
            EventBus.getInstance().publish<HelloWorldMessage>(HelloWorldEvent, {
                name: 'Benjamin',
            });

            assert.equal(Fake.MESSAGE_1, 'Hello Benjamin!');
            assert.equal(Fake.COUNT_1, 12);
        });
    });
});
