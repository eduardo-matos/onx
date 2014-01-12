define([
    'dojo/query',
    '../util/delayed'
], function (
    query,
    delayed
) {
    'use strict';

    query.NodeList.prototype.delay = function (evt, fn, delay) {
        fn = delay? delayed(fn, delay): fn;
        var handle = this.on(evt, fn);

        handle.cancel = fn.cancel;

        return handle;
    };

});
