define([
    'dojo/topic'
], function (
    topic
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

    return function (evt, fn, delay) {
        fn = delay? callDelayed(fn, delay): fn;
        var handle = topic.subscribe(evt, fn);

        handle.cancel = fn.cancel;

        return handle;
    };
});
