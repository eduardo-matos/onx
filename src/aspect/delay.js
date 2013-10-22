define([
    'dojo/aspect',
    '../util/delayed'
], function (
    aspect,
    delayed
) {
    'use strict';

    return function (obj, method, fn, receiveArguments, delay) {
        fn = delay? delayed(fn, delay): fn;
        var handle = aspect.after(obj, method, fn, receiveArguments);

        handle.cancel = fn.cancel;

        return handle;
    };
});
