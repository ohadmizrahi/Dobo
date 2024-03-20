import asyncio
import time
from asyncio import Task

class AgentManager:
    def __init__(self):
        self.agents = {}
        self.cleanning: Task = None

    async def create_or_activate_agent(self, group_id):
        if group_id not in self.agents:
            agent = Agent(stream=1, group_id=group_id)
            self.agents[group_id] = agent
            await agent.activate()
            agent.task = asyncio.create_task(agent.execute_action())
        else:
            await self.agents[group_id].activate()
    
    async def cleanup(self):
        while True:
            running_agents = (agent for agent in self.agents.values() if agent.task and agent.last_execution)
            for agent in running_agents:
                if time.time() - agent.last_execution > 20:
                    await agent.stop()
                elif time.time() - agent.last_execution > 10:
                    await agent.deactivate()
            await asyncio.sleep(10)


class Agent:
    def __init__(self, stream, group_id):
        self.stream = stream
        self.group_id = group_id
        self.active = False
        self.last_execution = time.time()
        self.task: Task = None

    async def activate(self):
        print(f"Agent activated for group {self.group_id}")
        self.active = True
    
    async def deactivate(self):
        print(f"Agent deactivated for group {self.group_id}")
        self.active = False
    
    async def stop(self):
        print(f"Stopping agent for group {self.group_id}")
        self.task.cancel()
        self.task = None
    
    async def check_stream(self):
        return True

    async def execute_action(self):
        while True:
            if self.active:
                if await self.check_stream():
                    print(f"Agent executing action for group {self.group_id} at {time.strftime('%H:%M:%S')}")
                    self.last_execution = time.time()
                
                await asyncio.sleep(10)  # Wait for 1 minutes
            else:
                await asyncio.sleep(1)

    def to_dict(self):
        return {
            "stream": self.stream,
            "group_id": self.group_id,
            "active": self.active,
            "last_execution": self.last_execution,
        }
