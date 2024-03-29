from aio_pika import ExchangeType, Message
import asyncio


class Producer:
    def __init__(self, queue_name, exchange_name, connection):
        self.exchange_name = exchange_name
        self.routing_key = queue_name
        self.connection = connection
        self.exchange_type = ExchangeType.DIRECT
        self.channel = None
        self.exchange = None


    async def setup(self):
        self.channel = await self.connection.channel()
        self.exchange = await self.channel.declare_exchange(self.exchange_name, self.exchange_type)
        return self

    async def produce(self, message):
        await self.exchange.publish(Message(body=message.encode()), routing_key=self.routing_key)
        print(f"Produced message {message} to queue {self.routing_key}")