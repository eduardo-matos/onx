define([
    './on/delay',
    'dojo/has',
    'dojo/_base/kernel'
], function (
    delay,
    has,
    kernel
) {
    'use strict';

    if(has('dojo-debug-messages')) {
        kernel.deprecated('onx/delay', 'Use onx/on/delay instead.');
    }

    return delay;
});
