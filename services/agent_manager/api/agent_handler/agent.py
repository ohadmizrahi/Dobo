import asyncio
import json
import random
import time
from services.agent_manager.api.queue_handler.table_consumer import Consumer

class Agent:
    def __init__(self, broker_conn, queue_id, producer):
        self.broker_conn = broker_conn
        self.queue_id = queue_id
        self.producer = producer
        self.last_execution = time.time()
        self.active = False
        self.job = None
        self.consumer = None
        self.max_retry = 3

    async def activate(self):
        print(f"Agent activated for queue {self.queue_id}")
        self.active = True
        self.consumer = await Consumer(
            queue_id=self.queue_id,
            broker_conn=self.broker_conn
            ).setup()
    
    async def deactivate(self):
        print(f"Agent deactivated for queue {self.queue_id}")
        self.active = False
    
    async def stop(self):
        print(f"Stopping agent for queue {self.queue_id}")
        await self.consumer.close()
        self.active = False
        self.consumer = None
        self.job = None
        
    async def process_new_orders(self):
        raw_orders = await self._get_orders()
        if raw_orders:
            print(f"Processing {len(raw_orders)} new orders for queue {self.queue_id} at {time.strftime('%H:%M:%S')}")
            orders = self._prepare_orders(raw_orders)
            failed_orders = await self._send_orders(orders)
            if failed_orders:
                await self._queue_failed_orders(failed_orders)
            self.last_execution = time.time()
        else:
            print(f"No new orders for queue {self.queue_id}")

    async def _get_orders(self):
        if self.active:
            print(f"Getting orders from queue {self.queue_id} at {time.strftime('%H:%M:%S')}")
            return await self.consumer.consume()
        return []
            
    def _prepare_orders(self, orders):
        print("Preparing orders...")
        grouped_data = {}
        for order in orders:
            order_dict = json.loads(order.body.decode())
            business_id = order_dict['businessid']
            table_id = order_dict['tableid']
            
            if business_id not in grouped_data:
                grouped_data[business_id] = {}
            
            if table_id not in grouped_data[business_id]:
                grouped_data[business_id][table_id] = []

            grouped_data[business_id][table_id].append(order)

        print(f"Total of {len(orders)} Orders prepared for {len(grouped_data)} businesses")
        return grouped_data

    async def _send_orders(self, orders):
        print("Sending orders...")
        failed_orders = []
        for business_id, tables in orders.items():
            queue = await self.producer.get_queue(business_id)

            for table_id, orders in tables.items():
                bon = json.dumps(
                    {
                        "table": table_id,
                        "orders": self._create_bon_orders(orders)
                    })

                status = await self.producer.produce(
                    queue=queue,
                    message=bon
                )

                if not status:
                    failed_orders.extend(orders)

        if failed_orders:
            print(f"Failed to send {len(failed_orders)} orders...")
        else:
            print("All orders sent successfully")
        return failed_orders

    def _create_bon_orders(self, orders):
        bon_orders = {}
        for order in orders:
            items = json.loads(order.body.decode())['orders']
            for item in items:
                if item['itemId'] not in bon_orders:
                    bon_orders[item['itemId']] = {
                        'name': item['itemName'],
                        'quantity': 0
                    }
                bon_orders[item['itemId']]['quantity'] += item['count']

        return bon_orders

    async def _queue_failed_orders(self, orders): 
        print(f"Queuing {len(orders)} failed orders...")
        queue = await self.producer.get_queue('failed_orders')
        for order in orders:
            await self.producer.produce(
                queue=queue,
                message=order.body.decode()
            )

    def to_dict(self):
        return {
            "queue_id": self.queue_id,
            "active": self.active,
            "last_execution": self.last_execution,
        }

class FailedOrdersAgent(Agent):
    def __init__(self, broker_conn, producer):
        super().__init__(broker_conn, 'retry', producer)

    async def process_new_orders(self):
        raw_orders = await self._get_orders()
        if raw_orders:
            print(f"Retry to process {len(raw_orders)} orders at {time.strftime('%H:%M:%S')}")
            orders = self._prepare_orders(raw_orders)
            orders_to_retry = await self._send_orders(orders)
            if orders_to_retry:
                print(f"Failed to process {len(orders_to_retry)} orders")

            self.last_execution = time.time()
        else:
            print('All orders has been processed')
