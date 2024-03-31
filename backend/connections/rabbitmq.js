require('dotenv').config();
const amqp = require('amqplib/callback_api');

let channelPromise = new Promise((resolve, reject) => {
    amqp.connect(`amqp://${process.env.RABBITMQ_HOST}`, function(connError, connection) {
        if (connError) {
            console.warn(connError.message);
            // reject(connError);
        }
        if (!connection) {
            // reject(new Error('Failed to connect to RabbitMQ server.'));
            console.warn('WARNING: Failed to connect to RabbitMQ server.');
        } else {
            connection.createChannel(function(channelError, channel) {
                if (channelError) {
                    console.warn(connError.message);
                    // reject(channelError);
                }
                resolve(channel);
            });
        }
        // TODO: Until RabbitMQ is implemented, resolve with null
        resolve(null);
    });
});

module.exports = channelPromise;