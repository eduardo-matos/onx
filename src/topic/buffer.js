define([
    'dojo/topic',
    'mout/function/debounce'
], function (
    topic,
    debounce
) {
    'use strict';

    return function (evt, fn, buffer) {
        fn = buffer? debounce(fn, buffer): fn;
        var handle = topic.subscribe(evt, fn);

        handle.cancel = fn.cancel;

        return handle;
    };
});
