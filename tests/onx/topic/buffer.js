define([
    'intern!object',
    'intern/chai!assert',
    'dojo/_base/lang',
    'dojo/topic',
    'onx/topic/buffer'
], function (
    registerSuite,
    assert,
    lang,
    topic,
    topicBuffer
) {

    var topicHandle;

    registerSuite({
        name: 'Test topic buffer',

        afterEach: function () {
            topicHandle.remove();
        },

        'should not call topic more than once while in buffer': function () {
            var dfd = this.async(100);
            var qtyExecutions = 0;

            topicHandle = topicBuffer('/abc', function () {
                qtyExecutions += 1;
            }, 50);

            setTimeout(dfd.callback(function () {
                assert.strictEqual(qtyExecutions, 1);
            }), 80);

            topic.publish('/abc');
            topic.publish('/abc');
            setTimeout(function  () {
                topic.publish('/abc');
            }, 20);
        },

        'should allow canceling the callback': function () {
            var dfd = this.async(100);
            var qtyExecutions = 0;

            var handle = topicHandle = topicBuffer('/abc', function () {
                qtyExecutions += 1;
            }, 50);

            setTimeout(dfd.callback(function () {
                assert.strictEqual(qtyExecutions, 0);
            }), 80);

            topic.publish('/abc');

            setTimeout(function () {
                handle.cancel();
            }, 30);
        }
    });
});
