define([
    'intern!object',
    'intern/chai!assert',
    'dojo/_base/lang',
    'dojo/on',
    'onx/buffer'
], function (
    registerSuite,
    assert,
    lang,
    on,
    buffer
) {

    var dummyObj;

    registerSuite({
        name: 'Test event buffer',

        beforeEach: function () {
            dummyObj = document.createElement('i');
        },

        'should not fire event more than once while in buffer': function () {
            var dfd = this.async(100);
            var qtyExecutions = 0;

            buffer(dummyObj, 'abc', function () {
                qtyExecutions += 1;
            }, 50);

            setTimeout(dfd.callback(function () {
                assert.strictEqual(qtyExecutions, 1);
            }), 80);

            on.emit(dummyObj, 'abc', {bubbles: false});
            on.emit(dummyObj, 'abc', {bubbles: false});
            setTimeout(function  () {
                on.emit(dummyObj, 'abc', {bubbles: false});
            }, 20);
        }
    });
});
