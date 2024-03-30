import asyncio

class Consumer:
    def __init__(self, queue_id, broker_conn):
        self.queue_id = queue_id
        self.broker_conn = broker_conn
        self.channel = None
        self.queue = None

    async def setup(self):
        self.channel = await self.broker_conn.channel()
        self.queue = await self.channel.declare_queue(self.queue_id)
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

    async def close(self):
        await self.queue.delete()