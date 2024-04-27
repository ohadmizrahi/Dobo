require('dotenv').config();
const amqp = require('amqplib/callback_api');

let channel;
let connection;

const connectToRabbitMQ = () => {
    return new Promise((resolve, reject) => {
        if (channel) {
            resolve(channel);
            return;
        }
        const password = encodeURIComponent(process.env.RABBITMQ_PASSWORD);
        amqp.connect(`amqps://${process.env.RABBITMQ_USERNAME}:${password}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`, function(connError, conn) {
            if (connError) {
                reject(`Failed to connect to RabbitMQ server: ${connError}`);
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
                    reject(`Failed to create channel: ${channelError}`);
                    return;
                }

                channel = ch;
                resolve(channel);
            });
        });
    });
};

module.exports = connectToRabbitMQ;