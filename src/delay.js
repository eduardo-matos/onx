define([
    'dojo/on'
], function (
    on
) {
    'use strict';

    function callDelayed (fn, delay) {
        return function () {
            var args = arguments;
            setTimeout(function () {
                fn.apply(this, args);
            }, delay);
        };
    }

    return function (obj, evt, fn, delay) {
        fn = delay? callDelayed(fn, delay): fn;
        return on(obj, evt, fn);
    };
});
