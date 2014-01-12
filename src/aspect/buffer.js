define([
    'dojo/aspect',
    '../util/buffered'
], function (
    aspect,
    buffered
) {
    'use strict';

    return function (obj, method, fn, receiveArguments, buffer) {
        fn = buffer? buffered(fn, buffer): fn;
        var handle = aspect.after(obj, method, fn, receiveArguments);

        handle.cancel = fn.cancel;

        return handle;
    };
});
