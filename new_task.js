#!/usr/bin/env node
const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }
        const queueName = 'task_queue';
        const msg = process.argv.slice(2).join(' ') || "Hello World!";

        channel.assertQueue(queueName, {
            durable: true
        });
        channel.sendToQueue(queueName, Buffer.from(msg), {
            persistent: true
        });
        console.log(" [x] Sent '%s'", msg);
    });
    setTimeout(function () {
        connection.close();
        process.exit(0)
    }, 500);
});
