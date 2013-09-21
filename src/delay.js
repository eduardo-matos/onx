define([
    'dojo/on',
    'mout/function/timeout'
], function (
    on,
    timeout
) {
    'use strict';

    return function (obj, evt, fn, delay) {
        fn = delay? timeout(fn, delay): fn;
        return on(obj, evt, fn);
    };
});
