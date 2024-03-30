import json
import time
from ..queue_handler.table_consumer import Consumer

class Agent:
    def __init__(self, broker_conn, queue_id, producer):
        self.broker_conn = broker_conn
        self.queue_id = queue_id
        self.producer = producer
        self.last_execution = time.time()
        self.active = False
        self.job = None
        self.consumer = None

    async def activate(self):
        print(f"Agent activated for queue  {self.queue_id}")
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
        
    async def handle_new_orders(self):
        if self.active:
            print(f"Agent executing action for queue {self.queue_id} at {time.strftime('%H:%M:%S')}")
            messages = await self.consumer.consume()
            if messages:
                print(f"Processing {len(messages)} new orders for queue {self.queue_id}")
                businesses = self._prepare_to_produce(messages)
                for business_id, tables in businesses.items():
                    print(f"Producing orders for business {business_id}")
                    queue = await self.producer.get_queue(business_id)
                    for table_id, orders in tables.items():
                        await self.producer.produce(
                            queue=queue,
                            order=json.dumps(
                                {
                                    "table": table_id,
                                    "orders": orders
                                })
                        ) 
                self.last_execution = time.time()
            else:
                print(f"No new orders for queue {self.queue_id}")
    
    def _prepare_to_produce(self, orders):
        grouped_data = {}
        for order in orders:
            order_dict = json.loads(order)
            business_id = order_dict['businessid']
            table_id = order_dict['tableid']
            orders = order_dict['orders']
            
            if business_id not in grouped_data:
                grouped_data[business_id] = {}
            
            if table_id not in grouped_data[business_id]:
                grouped_data[business_id][table_id] = []
            
            grouped_data[business_id][table_id].extend(orders)

        return grouped_data

        
    def to_dict(self):
        return {
            "queue_id": self.queue_id,
            "active": self.active,
            "last_execution": self.last_execution,
        }
