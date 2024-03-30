import asyncio
from aio_pika import Message

class Producer:
    def __init__(self, broker_conn):
        self.broker_conn = broker_conn
        self.channel = None

    async def setup(self):
        self.channel = await self.broker_conn.channel()
        return self
    
    async def get_queue(self, queue_id):
        return await self.channel.declare_queue(queue_id)

    async def produce(self, order, queue):
        print(f"Producing orders to queue {queue.name}")
        try:
            message = Message(body=order.encode())
            await self.channel.default_exchange.publish(message, routing_key=queue.name)
        except Exception as e:
            print(f"Failed to produce order to queue {queue.name}: {e}")
        await asyncio.sleep(1)