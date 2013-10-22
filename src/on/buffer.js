define([
    'dojo/on',
    'mout/function/debounce'
], function (
    on,
    debounce
) {
    'use strict';

    return function (obj, evt, fn, buffer) {
        fn = buffer? debounce(fn, buffer): fn;
        var handle = on(obj, evt, fn);

        handle.cancel = fn.cancel;

        return handle;
    };
});
