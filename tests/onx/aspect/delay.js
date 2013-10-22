define([
    'intern!object',
    'intern/chai!assert',
    'dojo/aspect',
    'onx/aspect/delay'
], function (
    registerSuite,
    assert,
    aspect,
    delayedAspect
) {

    var aspectHandle;

    registerSuite({
        name: 'Test aspect delay',

        afterEach: function () {
            aspectHandle.remove();
        },

        'should not call aspect until delay is reached': function () {
            var dfd = this.async(50);
            var evtTriggered = false;
            var foo = {bar: function () {}};

            aspectHandle = delayedAspect(foo, 'bar', function () {
                evtTriggered = true;
            }, true, 30);

            setTimeout(dfd.callback(function () {
                assert.strictEqual(false, evtTriggered);
            }), 20);

            foo.bar();
        },

        'should have fired aspect after delay is reached': function () {
            var dfd = this.async(50);
            var evtTriggered = false;
            var foo = {bar: function () {}};

            aspecthandle = delayedAspect(foo, 'bar', function () {
                evtTriggered = true;
            }, true, 20);

            setTimeout(dfd.callback(function () {
                assert.strictEqual(true, evtTriggered);
            }), 30);

            foo.bar();
        },

        'should fire as many topics as triggered': function () {
            var dfd = this.async(200);
            var qtyExecutions = 0;
            var foo = {bar: function () {}};

            aspecthandle = delayedAspect(foo, 'bar', function () {
                qtyExecutions += 1;
            }, true, 50);

            setTimeout(dfd.callback(function () {
                assert.strictEqual(3, qtyExecutions);
            }), 100);

            foo.bar();
            foo.bar();
            foo.bar();
        },

        'should allow canceling the callback': function () {
            var dfd = this.async(200);
            var qtyExecutions = 0;
            var foo = {bar: function () {}};

            var handle = aspecthandle = delayedAspect(foo, 'bar', function () {
                qtyExecutions += 1;
            }, true, 50);

            setTimeout(dfd.callback(function () {
                assert.strictEqual(0, qtyExecutions);
            }), 100);

            foo.bar();

            setTimeout(function () {
                handle.cancel();
            }, 30);
        }
    });

});
