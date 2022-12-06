[npm-url]: https://www.npmjs.com/package/@xtitusx/event-bus
[npm-image]: https://img.shields.io/npm/v/@xtitusx/event-bus
[ci-image]: https://img.shields.io/travis/com/xtitusx/event-bus
[codecov-url]: https://codecov.io/gh/xtitusx/event-bus
[codecov-image]: https://codecov.io/gh/xtitusx/event-bus/branch/master/graph/badge.svg?token=6WEWL2D8DB
[snyk-security-image]: https://snyk-widget.herokuapp.com/badge/npm/%40xtitusx%2Fevent-bus/badge.svg
[snyk-url]: https://snyk.io/test/github/xtitusx/event-bus/badge.svg
[snyk-image]: https://snyk.io/test/github/xtitusx/event-bus
[downloads-image]: https://img.shields.io/npm/dm/@xtitusx/event-bus
[min-size-image]: https://img.shields.io/bundlephobia/min/@xtitusx/event-bus

# event-bus

[![NPM version][npm-image]][npm-url]
![CI][ci-image]
[![Coverage][codecov-image]][codecov-url]
![Security badge][snyk-security-image]
[![Known vulnerabilities][snyk-url]][snyk-image]
[![Downloads][downloads-image]][npm-url]
[![Minified size][min-size-image]][npm-url]

**event-bus** handles events, on a pub-sub design pattern basis.

:rocket: **Node.js ready for launch.**

# Table of Contents

1. [Installation](#installation)
2. [Basic Usage](#basic-usage)
3. [EventBus](#eventbus)
4. [Subscription](#subscription)
3. [TypeDoc](#typedoc)
4. [Changelog](#changelog)
5. [Maintainer](#maintainer)
6. [License](#license)

## Installation

```
npm install @xtitusx/event-bus
```

## Basic Usage

- Declare an event:

```
export class HelloWorldEvent extends Event {}
```

- Declare a message:

```
export type HelloWorldMessage = { name?: string };
```

- Declare a subscriber:

```
export class HelloWorldEventSubscriber extends Subscriber<HelloWorldEvent> {
    constructor() {
        super(HelloWorldEvent);
    }

    /**
     * @override
     */
    public implCallback(): Function {
        return async (message: HelloWorldMessage): Promise<void> => {
            console.log(`Hello ${message?.name ?? 'World'}!`);
        };
    }
}
```

- Then you can play around with an **EventBus** instance:

```
const eventBus = new EventBus();
eventBus.subscribe(new HelloWorldEventSubscriber());
            eventBus.publish<HelloWorldMessage>(HelloWorldEvent, {
                name: 'Benjamin',
            });

// => 'Hello Benjamin!'       
```

```
const eventBus = new EventBus();
const subcription = eventBus.subscribe(new HelloWorldEventSubscriber());
eventBus.publish<HelloWorldMessage>(HelloWorldEvent);
// => 'Hello World!' 
subcription.unsubscribe();
```

```
const eventBus = new EventBus();
eventBus.once(new HelloWorldEventSubscriber());
            eventBus.publish<HelloWorldMessage>(HelloWorldEvent, {
                name: 'Chorizo',
            });

// => 'Hello Chorizo!'       
```

```
const eventBus = new EventBus();
eventBus.subscribe(new HelloWorldEventSubscriber());
            eventBus.publish<HelloWorldMessage>(HelloWorldEvent, {
                name: 'Benjamin',
            });

// => 'Hello Benjamin!' 
eventBus.clear();
```

## EventBus

```
export interface IEventBus {
    /**
     * Adds a subscriber for the specified event. No checks are made to see if the subscriber has already been added.
     *
     * Multiple calls passing the same combination of event and subscriber will result in the subscriber being added multiple times.
     * @override
     * @param subscriber
     */
    subscribe<T extends Event>(subscriber: ISubscriber<T>): ISubscription;

    /**
     * Adds a one time subscriber to the event. This subscriber is invoked only the next time the event is fired, after which it is removed.
     * @override
     * @remarks Chainable method.
     * @param subscriber
     */
    once<T extends Event>(subscriber: ISubscriber<T>): IEventBus;

    /**
     * Executes each of the subscribers for the specified event.
     * @override
     * @param event
     * @param message
     */
    publish<T>(event: Event, message?: T): void;

    /**
     * Removes all subscribers.
     * @override
     */
    clear(): void;
}
```

## Subscription

```
export interface ISubscription {
    id: string;
    eventName: string;
    /**
     * Removes the subscriber for the specified event.
     */
    unsubscribe: () => void;
}
```

## TypeDoc

[GitHub HTML Preview](https://htmlpreview.github.io/?https://raw.githubusercontent.com/xtitusx/event-bus/master/docs/index.html)

## Changelog

See information about breaking changes and release notes [here](CHANGELOG.md).

## Maintainer

-   [xtitusx](https://github.com/xtitusx) - **Benjamin Tussac** (author)

## License

```
MIT License

Copyright (c) 2021 Benjamin Tussac

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
