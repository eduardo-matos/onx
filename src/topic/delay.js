define([
    'dojo/topic',
    '../util/delayed'
], function (
    topic,
    delayed
) {
    'use strict';

    return function (evt, fn, delay) {
        fn = delay? delayed(fn, delay): fn;
        var handle = topic.subscribe(evt, fn);

        handle.cancel = fn.cancel;

        return handle;
    };
});
