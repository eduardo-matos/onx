define(function () {
    'use strict';

    return function (fn, delay) {

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

});
