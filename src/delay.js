define([
    'dojo/on'
], function (
    on
) {
    'use strict';

    function callDelayed (fn, delay) {

        var timeoutHandle,
            returnFn = function () {
            var args = arguments;
            timeoutHandle = setTimeout(function () {
                fn.apply(this, args);
            }, delay);
        };

        returnFn.cancel = function () {
            clearTimeout(timeoutHandle);
        };

        return returnFn;
    }

    return function (obj, evt, fn, delay) {
        fn = delay? callDelayed(fn, delay): fn;
        var handle = on(obj, evt, fn);

        handle.cancel = fn.cancel;

        return handle;
    };
});
