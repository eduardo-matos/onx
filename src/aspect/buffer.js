define([
    'dojo/aspect',
    'mout/function/debounce'
], function (
    aspect,
    debounce
) {
    'use strict';

    return function (obj, method, fn, receiveArguments, buffer) {
        fn = buffer? debounce(fn, buffer): fn;
        var handle = aspect.after(obj, method, fn, receiveArguments);

        handle.cancel = fn.cancel;

        return handle;
    };
});
