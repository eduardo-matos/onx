define([
    'dojo/query',
    '../util/buffered'
], function (
    query,
    buffered
) {
    'use strict';

    query.NodeList.prototype.buffer = function (evt, fn, buffer) {
        fn = buffer? buffered(fn, buffer): fn;
        var handle = this.on(evt, fn);

        handle.cancel = fn.cancel;

        return handle;
    };

});
