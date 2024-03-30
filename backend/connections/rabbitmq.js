require('dotenv').config();
const amqp = require('amqplib/callback_api');

let channelPromise = new Promise((resolve, reject) => {
    amqp.connect(`amqp://${process.env.RABBITMQ_HOST}`, function(connError, connection) {
        if (connError) {
            reject(connError);
        }
        connection.createChannel(function(channelError, channel) {
            if (channelError) {
                reject(channelError);
            }
            resolve(channel);
        });
    });
});

module.exports = channelPromise;