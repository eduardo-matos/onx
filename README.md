# ONX
Extensions to `dojo/on` module

## How to use

### onx/on/delay
Delays an event by a specific amount of time in milliseconds.

```javascript   
require(['dojo/dom', 'onx/on/delay'], function (dom, delay) {
    var element = dom.byId('some-id');
    delay(element, 'click', function () {
        // this function will be called 200ms
        // after the actual click.
    }, 200);
});
```

### onx/on/buffer
Buffers an event by a specific amount of time in milliseconds.

```javascript
require(['dojo/dom', 'onx/on/buffer'], function (dom, buffer) {
    var element = dom.byId('some-id');
    buffer(element, 'click', function () {
        // this function will be called
        // at most once every 200ms
    }, 200);
});
```

### onx/topic/delay
Delays a topic callback by a specific amount of time in milliseconds.

```javascript
require(['dojo/topic', 'onx/topic/delay'], function (topic, delay) {
    delay('/abc', function () {
        // this function will be called 200ms
        // after the actual topic publish.
    }, 200);

    topic.publish('/abc');
});
```

### onx/topic/buffer
Buffers a topic by a specific amount of time in milliseconds.

```javascript
require(['dojo/topic', 'onx/topic/buffer'], function (topic, buffer) {
    buffer('/abc', function () {
        // this function will be called
        // at most once every 200ms
    }, 200);

    topic.publish('/abc');
    topic.publish('/abc');
});
```

### onx/aspect/delay
Delays an aspect callback by a specific amount of time in milliseconds.

```javascript
require(['dojo/aspect', 'onx/aspect/delay'], function (aspect, delay) {
    var foo = {
        bar: function () {}
    };

    delay(foo, 'bar', function () {
        // this function will be called 200ms
        // after 'foo.bar' execution.
    }, false, 200);

    foo.bar();
});
```

### onx/aspect/buffer
Buffers an aspect by a specific amount of time in milliseconds.

```javascript
require(['dojo/aspect', 'onx/aspect/buffer'], function (aspect, buffer) {
    var foo = {
        bar: function () {}
    };

    buffer(foo, 'bar', function () {
        // this function will be called
        // at most once every 200ms
    }, false, 200);

    foo.bar();
    foo.bar();
});
```

_Ps.: Both `onx/aspect/delay` and `onx/aspect/buffer` are attached to `aspect.after` method._

### Canceling callback execution
It's possible to cancel the callback execution on both _delay_ and _buffer_ modules.
You just need to call `handle.cancel` like the following example.

```javascript
require(['dojo/dom', 'onx/on/buffer'], function (dom, buffer) {
    var element = dom.byId('some-id');
    var handle = buffer(element, 'click', function () {
        // this function will be called
        // at most once every 200ms
    }, 200);

    // forcing event emission
    on.emit(element, 'click', {bubbles: true});

    // callback won't be called
    handle.cancel();
});
```

## Unit testing
To run the unit tests, make sure you install all dependencies (`bower install && npm install`).
You must have a webserver running. It's ok to use Python (`python -m SimpleHTTPServer 8080`) or PHP (`PHP -S localhost:8080`) to create a development server. Then head to `http://localhost:8080/node_modules/intern/client.html?config=tests/intern` and take a look at your browser console.

All unit tests are located at the tests directory.

## License
Licensed under MIT.

Copyright (C) 2013 Eduardo de Matos eduardo.matos.silva@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
