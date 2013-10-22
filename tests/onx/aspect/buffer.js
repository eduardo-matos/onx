define([
    'intern!object',
    'intern/chai!assert',
    'dojo/aspect',
    'onx/aspect/buffer'
], function (
    registerSuite,
    assert,
    aspect,
    aspectBuffer
) {

    var aspectHandle;

    registerSuite({
        name: 'Test aspect buffer',

        afterEach: function () {
            aspectHandle.remove();
        },

        'should not call aspect more than once while in buffer': function () {
            var dfd = this.async(100);
            var qtyExecutions = 0;
            var foo = {bar: function () {}};

            aspectHandle = aspectBuffer(foo, 'bar', function () {
                qtyExecutions += 1;
            }, true, 50);

            setTimeout(dfd.callback(function () {
                assert.strictEqual(qtyExecutions, 1);
            }), 80);

            foo.bar();
            foo.bar();

            setTimeout(function  () {
                foo.bar();
            }, 20);
        },

        'should allow canceling the callback': function () {
            var dfd = this.async(100);
            var qtyExecutions = 0;
            var foo = {bar: function () {}};

            var handle = aspectHandle = aspectBuffer(foo, 'bar', function () {
                qtyExecutions += 1;
            }, true, 50);

            setTimeout(dfd.callback(function () {
                assert.strictEqual(qtyExecutions, 0);
            }), 80);

            foo.bar();

            setTimeout(function () {
                handle.cancel();
            }, 30);
        }
    });
});
