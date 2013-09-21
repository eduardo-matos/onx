define([
    'intern!object',
    'intern/chai!assert',
    'dojo/_base/lang',
    'dojo/on',
    'onx/delay',
    'onx/buffer'
], function (
    registerSuite,
    assert,
    lang,
    on,
    delay,
    buffer
) {

    var dummyObj;

    registerSuite({
        name: 'Test event delay',

        beforeEach: function () {
            dummyObj = document.createElement('i');
        },

        'should not fire event until delay is reached': function () {
            var dfd = this.async(50);
            var evtTriggered = false;

            delay(dummyObj, 'abc', function () {
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

            delay(dummyObj, 'abc', function () {
                evtTriggered = true;
            }, 20);

            setTimeout(dfd.callback(function () {
                assert.strictEqual(true, evtTriggered);
            }), 30);

            on.emit(dummyObj, 'abc', {bubbles: false});
        }
    });

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
