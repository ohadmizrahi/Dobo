from aio_pika import ExchangeType
import asyncio

class Consumer:
    def __init__(self, queue_id, exchange_name, connection):
        self.exchange_name = exchange_name
        self.queue_id = queue_id
        self.connection = connection
        self.exchange_type = ExchangeType.DIRECT
        self.channel = None
        self.queue = None
        self.exchange = None


    async def setup(self):
        self.channel = await self.connection.channel()
        self.exchange = await self.channel.declare_exchange(self.exchange_name, self.exchange_type)
        self.queue = await self.channel.declare_queue(self.queue_id)
        await self.queue.bind(self.exchange, routing_key=self.queue_id)
        return self

    async def consume(self):
        print(f"Consuming orders from queue {self.queue_id}")
        orders = []
        while True:
            try:
                async with self.queue.iterator(timeout=1.0) as iqueue:
                    async for order in iqueue:
                        orders.append(order.body.decode())
                        await order.ack()
            except asyncio.TimeoutError:
                print(f'All orders has been consumed, total consumed orders {len(orders)}')
                break

        return orders