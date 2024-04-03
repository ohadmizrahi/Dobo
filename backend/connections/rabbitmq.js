require('dotenv').config();
const amqp = require('amqplib/callback_api');

let channel;
let connection;

const connectToRabbitMQ = () => {
    return new Promise((resolve, reject) => {
        // if (channel) {
        //     resolve(channel);
        //     return;
        // }

        amqp.connect(`amqp://${process.env.RABBITMQ_HOST}`, function(connError, conn) {
            if (connError) {
                reject(connError);
                return;
            }

            connection = conn;

            connection.on('error', (err) => {
                console.error('Connection error', err);
                channel = null;
                // Try to reconnect
                connectToRabbitMQ().catch(console.error);
            });

            connection.on('close', () => {
                console.error('Connection closed');
                channel = null;
                // Try to reconnect
                connectToRabbitMQ().catch(console.error);
            });

            connection.createChannel(function(channelError, ch) {
                if (channelError) {
                    reject(channelError);
                    return;
                }

                channel = ch;
                resolve(channel);
            });
        });
    });
};

module.exports = connectToRabbitMQ;