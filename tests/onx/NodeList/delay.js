define([
    'intern!object',
    'intern/chai!assert',
    'dojo/_base/lang',
    'dojo/on',
    'dojo/query',
    'onx/NodeList/delay'
], function (
    registerSuite,
    assert,
    lang,
    on,
    query
) {

    var dummyObj;

    registerSuite({
        name: 'Test event delay on NodeList',

        beforeEach: function () {
            dummyObj = document.createElement('i');
        },

        'should not fire event until delay is reached': function () {
            var dfd = this.async(50);
            var evtTriggered = false;

            query(dummyObj).delay('abc', function () {
                evtTriggered = true;
            }, 30);

            setTimeout(dfd.callback(function () {
                assert.strictEqual(false, evtTriggered);
            }), 20);

            on.emit(dummyObj, 'abc', {bubbles: false});
        },

        'should have fired event after delay is reached': function () {
            var dfd = this.async(50);
            var evtTriggered = false;

            query(dummyObj).delay('abc', function () {
                evtTriggered = true;
            }, 20);

            setTimeout(dfd.callback(function () {
                assert.strictEqual(true, evtTriggered);
            }), 30);

            on.emit(dummyObj, 'abc', {bubbles: false});
        },

        'should fire as many events as triggered': function () {
            var dfd = this.async(200);
            var qtyExecutions = 0;

            query(dummyObj).delay('abc', function () {
                qtyExecutions += 1;
            }, 50);

            setTimeout(dfd.callback(function () {
                assert.strictEqual(3, qtyExecutions);
            }), 100);

            on.emit(dummyObj, 'abc', {bubbles: false});
            on.emit(dummyObj, 'abc', {bubbles: false});
            on.emit(dummyObj, 'abc', {bubbles: false});
        },

        'should allow canceling the callback': function () {
            var dfd = this.async(200);
            var qtyExecutions = 0;

            var handle = query(dummyObj).delay('abc', function () {
                qtyExecutions += 1;
            }, 50);

            setTimeout(dfd.callback(function () {
                assert.strictEqual(0, qtyExecutions);
            }), 100);

            on.emit(dummyObj, 'abc', {bubbles: false});
            setTimeout(function () {
                handle.cancel();
            }, 30);
        }
    });

});
