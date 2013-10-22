define([
    'intern!object',
    'intern/chai!assert',
    'dojo/topic',
    'onx/topic/delay'
], function (
    registerSuite,
    assert,
    topic,
    delayedTopic
) {

    var topicHandle;

    registerSuite({
        name: 'Test topic delay',

        afterEach: function () {
            topicHandle.remove();
        },

        'should not call topic until delay is reached': function () {
            var dfd = this.async(50);
            var evtTriggered = false;

            topicHandle = delayedTopic('/abc', function () {
                evtTriggered = true;
            }, 30);

            setTimeout(dfd.callback(function () {
                assert.strictEqual(false, evtTriggered);
            }), 20);

            topic.publish('/abc');
        },

        'should have fired topic after delay is reached': function () {
            var dfd = this.async(50);
            var evtTriggered = false;

            topicHandle = delayedTopic('/abc', function () {
                evtTriggered = true;
            }, 20);

            setTimeout(dfd.callback(function () {
                assert.strictEqual(true, evtTriggered);
            }), 30);

            topic.publish('/abc');
        },

        'should fire as many topics as triggered': function () {
            var dfd = this.async(200);
            var qtyExecutions = 0;

            topicHandle = delayedTopic('/abc', function () {
                qtyExecutions += 1;
            }, 50);

            setTimeout(dfd.callback(function () {
                assert.strictEqual(3, qtyExecutions);
            }), 100);

            topic.publish('/abc');
            topic.publish('/abc');
            topic.publish('/abc');
        },

        'should allow canceling the callback': function () {
            var dfd = this.async(200);
            var qtyExecutions = 0;

            var handle = topicHandle = delayedTopic('/abc', function () {
                qtyExecutions += 1;
            }, 50);

            setTimeout(dfd.callback(function () {
                assert.strictEqual(0, qtyExecutions);
            }), 100);

            topic.publish('/abc');
            setTimeout(function () {
                handle.cancel();
            }, 30);
        }
    });

});
