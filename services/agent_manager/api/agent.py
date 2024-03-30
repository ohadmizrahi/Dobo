import time
import pytz
from .consumer import Consumer

class AgentManager:
    def __init__(self, scheduler):
        self.agents = {}
        self.scheduler = scheduler
        self.exchange = "orders"

    async def create_or_activate_agent(self, connection, queue_id):
        if queue_id not in self.agents:
            agent = Agent(connection=connection, exchange_name=self.exchange, queue_id=queue_id)
            self.agents[queue_id] = agent
            await agent.activate()

            job = self.scheduler.add_job(
                func=agent.consume_new_orders,
                trigger='interval',
                seconds=20,
                timezone=pytz.utc
                )
            
            agent.job = job
            return {"status": "created", "queue_name": queue_id}
        else:
            await self.agents[queue_id].activate()
            return {"status": "activated", "group_id": queue_id}

    async def cleanup(self):
        running_agents = (agent for agent in self.agents.values() if agent.job and agent.last_execution)
        for agent in running_agents:
            if time.time() - agent.last_execution > 100:
                self.scheduler.remove_job(agent.job.id)
                await agent.stop()
            elif time.time() - agent.last_execution > 300:
                await agent.deactivate()

class Agent:
    def __init__(self, connection, exchange_name, queue_id ):
        self.connection = connection
        self.exchange_name = exchange_name
        self.queue_id = queue_id
        self.active = False
        self.last_execution = time.time()
        self.job = None
        self.consumer = None
        

    async def activate(self):
        print(f"Agent activated for queue  {self.queue_id}")
        self.active = True
        self.consumer = await Consumer(
            queue_id=self.queue_id,
            exchange_name=self.exchange_name,
            connection=self.connection
            ).setup()
    
    async def deactivate(self):
        print(f"Agent deactivated for queue {self.queue_id}")
        self.active = False
        self.consumer = None
    
    async def stop(self):
        print(f"Stopping agent for queue {self.queue_id}")
        self.job = None

    async def consume_new_orders(self):
        if self.active:
            print(f"Agent executing action for queue {self.queue_id} at {time.strftime('%H:%M:%S')}")
            messages = await self.consumer.consume()
            if messages:
                self.last_execution = time.time()
            else:
                print(f"No new orders for queue {self.queue_id}")

    def to_dict(self):
        return {
            "queue_id": self.queue_id,
            "active": self.active,
            "last_execution": self.last_execution,
        }
