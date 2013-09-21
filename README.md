# ONX
Extensions to `dojo/on` module

## How to use

### onx/delay
Delays an event by a specific amount of time in miliseconds.

```javascript   
require(['dojo/dom', 'onx/delay'], function (dom, delay) {
    var element = dom.byId('some-id');
    delay(element, 'click', function () {
        // this function will be called 200ms
        // after the actual click.
    }, 200);
});
```

### onx/buffer
Buffers an event by a specific amount of time in miliseconds.

```javascript
require(['dojo/dom', 'onx/delay'], function (dom, delay) {
    var element = dom.byId('some-id');
    delay(element, 'click', function () {
        // this function will be called
        // at most once every 200ms
    }, 200);
});
```

## Unit testing
To run the unit tests, make sure you install all dependencies (`bower install && npm install`).
You must have a webserver running. It's ok to use Python (`python -m SimpleHTTPServer 8080`) or PHP (`PHP -S localhost:8080`) to create a development server. Then head to `http://localhost:8080/node_modules/intern/client.html?config=tests/intern` and take a look at you browser console.

All unit tests are located at the tests directory.

## License
Licensed under MIT.

Copyright (C) 2013 Eduardo de Matos eduardo.matos.silva@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.