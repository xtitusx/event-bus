import { assert } from 'chai';

import { HelloWorldEvent } from './hello-world.event';

describe('Event', () => {
    it("shoud assign 'HelloWorldEvent' value to 'event.name'", () => {
        const event = new HelloWorldEvent();

        assert.equal(event.name, 'HelloWorldEvent');
    });
});
