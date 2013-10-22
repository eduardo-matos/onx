define([
    'dojo/on',
    './util/delayed'
], function (
    on,
    delayed
) {
    'use strict';

    return function (obj, evt, fn, delay) {
        fn = delay? delayed(fn, delay): fn;
        var handle = on(obj, evt, fn);

        handle.cancel = fn.cancel;

        return handle;
    };
});
