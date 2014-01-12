define([
    'dojo/on',
    '../util/buffered'
], function (
    on,
    buffered
) {
    'use strict';

    return function (obj, evt, fn, buffer) {
        fn = buffer? buffered(fn, buffer): fn;
        var handle = on(obj, evt, fn);

        handle.cancel = fn.cancel;

        return handle;
    };
});
