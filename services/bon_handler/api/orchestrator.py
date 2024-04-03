import asyncio
from datetime import datetime
import json
from time import sleep

class Orchestrator:
    def __init__(self, consumer, processor):
        self.consumer = consumer
        self.processor = processor
    
    async def setup(self):
        self.consumer = await self.consumer.setup()
        await self.processor.connect()
        return self
    
    def __str__(self) -> str:
        return f"{self.consumer} -> {self.processor}"

    async def run(self):
        print(f"Running orchestrator: {self} at {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        async for message in self.consumer.consume():
            message_body = json.loads(message.body.decode())
            processed = await self.processor.process(message_body)
            if processed:
                await self.consumer.acknowledge(message)
            else:
                print(f"Failed to process message: {message_body} at {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
                await message.nack(requeue=True)
    
    async def stop(self):
        await self.consumer.close()
        await self.processor.close()