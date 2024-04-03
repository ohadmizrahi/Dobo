import os
from abc import ABC, abstractmethod


from abc import ABC, abstractmethod

class Consumer(ABC):

    @property
    @abstractmethod
    def type(self):
        pass

    @abstractmethod
    async def setup(self):
        pass

    @abstractmethod
    async def consume(self):
        pass

    @abstractmethod
    async def close(self):
        pass

    def __str__(self) -> str:
        return self.type

class RabbitMQConsumer(Consumer):
    def __init__(self, broker_config):
        self.queue_id = os.getenv('BUSINESS_ID')
        self.broker_config = broker_config
        self.broker_conn = None
        self.channel = None
        self.queue = None
    
    @property
    def type(self):
        return "RabbitMQ"

    async def setup(self):
        self.broker_conn = await self.broker_config.connect()
        self.channel = await self.broker_conn.channel()
        self.queue = await self.channel.declare_queue(self.queue_id)
        return self

    async def consume(self):
        async with self.queue.iterator() as queue_iter:
            async for message in queue_iter:
                yield message

    async def acknowledge(self, message):
        await message.ack()

    async def close(self):
        await self.queue.delete()