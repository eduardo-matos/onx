define([
    'dojo/topic',
    '../util/buffered'
], function (
    topic,
    buffered
) {
    'use strict';

    return function (evt, fn, buffer) {
        fn = buffer? buffered(fn, buffer): fn;
        var handle = topic.subscribe(evt, fn);

        handle.cancel = fn.cancel;

        return handle;
    };
});
