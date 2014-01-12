define([
    'intern!object',
    'intern/chai!assert',
    'dojo/_base/lang',
    'dojo/query',
    'dojo/on',
    'onx/NodeList/buffer'
], function (
    registerSuite,
    assert,
    lang,
    query,
    on
) {

    var dummyObj;

    registerSuite({
        name: 'Test event buffer on NodeList',

        beforeEach: function () {
            dummyObj = document.createElement('i');
        },

        'should not fire event more than once while in buffer': function () {
            var dfd = this.async(100);
            var qtyExecutions = 0;

            query(dummyObj).buffer('abc', function () {
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
        },

        'should allow canceling the callback': function () {
            var dfd = this.async(100);
            var qtyExecutions = 0;

            var handle = query(dummyObj).buffer('abc', function () {
                qtyExecutions += 1;
            }, 50);

            setTimeout(dfd.callback(function () {
                assert.strictEqual(qtyExecutions, 0);
            }), 80);

            on.emit(dummyObj, 'abc', {bubbles: false});

            setTimeout(function () {
                handle.cancel();
            }, 30);
        }
    });
});
