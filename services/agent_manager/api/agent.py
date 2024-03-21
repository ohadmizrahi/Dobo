import time
from asyncio import Task

class AgentManager:
    def __init__(self, scheduler):
        self.agents = {}
        self.scheduler = scheduler
        self.scheduler.start()

    async def create_or_activate_agent(self, group_id):
        if group_id not in self.agents:
            agent = Agent(stream=1, group_id=group_id)
            self.agents[group_id] = agent
            await agent.activate()
            job = self.scheduler.add_job(agent.publish_new_orders, 'interval', seconds=10)
            agent.job = job
        else:
            await self.agents[group_id].activate()

    async def cleanup(self):
        running_agents = (agent for agent in self.agents.values() if agent.job and agent.last_execution)
        for agent in running_agents:
            if time.time() - agent.last_execution > 20:
                self.scheduler.remove_job(agent.job.id)
                await agent.stop()
            elif time.time() - agent.last_execution > 10:
                await agent.deactivate()

class Agent:
    def __init__(self, stream, group_id):
        self.stream = stream
        self.group_id = group_id
        self.active = False
        self.last_execution = time.time()
        self.job: Task = None

    async def activate(self):
        print(f"Agent activated for group {self.group_id}")
        self.active = True
    
    async def deactivate(self):
        print(f"Agent deactivated for group {self.group_id}")
        self.active = False
    
    async def stop(self):
        print(f"Stopping agent for group {self.group_id}")
        self.job = None
    
    async def check_stream(self):
        return True

    async def publish_new_orders(self):
        if self.active:
            if await self.check_stream():
                print(f"Agent executing action for group {self.group_id} at {time.strftime('%H:%M:%S')}")
                self.last_execution = time.time()
            else:
                print(f"Stream empty for group {self.group_id}")

    def to_dict(self):
        return {
            "stream": self.stream,
            "group_id": self.group_id,
            "active": self.active,
            "last_execution": self.last_execution,
        }
