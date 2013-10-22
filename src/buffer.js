define([
    './on/buffer',
    'dojo/has',
    'dojo/_base/kernel'
], function (
    buffer,
    has,
    kernel
) {
    'use strict';

    if(has('dojo-debug-messages')) {
        kernel.deprecated('onx/buffer', 'Use onx/on/buffer instead.');
    }

    return buffer;
});
