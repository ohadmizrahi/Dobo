import time
import pytz
from services.agent_manager.api.agent_handler.agent import Agent
from services.config.agent_manager import settings
from services.agent_manager.consts import INTERVAL

class AgentManager:
    def __init__(self, scheduler, producer):
        self.agents = {}
        self.scheduler = scheduler
        self.producer = producer

    async def create_or_activate_agent(self, broker_conn, queue_id):
        if queue_id not in self.agents:
            agent = Agent(
                broker_conn=broker_conn,
                queue_id=queue_id,
                producer=self.producer
                )
            
            self.agents[queue_id] = agent
            await agent.activate()

            job = self.scheduler.add_job(
                func=agent.process_new_orders,
                trigger=INTERVAL,
                seconds=settings.AGENT_SLEEPING_INTERVAL,
                timezone=pytz.utc
                )
            
            agent.job = job
            return {"status": "created", "queue_name": queue_id}
        else:
            await self.agents[queue_id].activate()
            return {"status": "activated", "group_id": queue_id}
    
    async def stop_agent(self, agent_id):
        if agent_id in self.agents:
            agent = self.agents[agent_id]
            self.scheduler.remove_job(agent.job.id)
            await agent.stop()
            self.agents.pop(agent_id)
            return {"status": "stopped", "agent_id": agent_id}
        else:
            return {"status": "failed", "agent_id": agent_id}

    async def cleanup(self):
        running_agents = (agent for agent in self.agents.values() if agent.job and agent.last_execution)
        agent_to_delete = []
        for agent in running_agents:
            if time.time() - agent.last_execution > settings.AGENT_TIMEOUT:
                self.scheduler.remove_job(agent.job.id)
                await agent.stop()
                agent_to_delete.append(agent.queue_id)
        
        for agent_id in agent_to_delete:
            del self.agents[agent_id]
        agent_to_delete.clear()
    
    async def fetch_agents_from_snapshot(self, db_conn, broker_conn):
        try:
            print('Fetching agents from snapshot db...')
            agents = await db_conn.fetch('SELECT queue_id FROM agents_data.agents')
            if not agents:
                print('No agents found in snapshot db')
                return
            for record in agents:
                queue_id = record['queue_id']
                await self.create_or_activate_agent(
                    broker_conn=broker_conn,
                    queue_id=queue_id
                    )
            print('Agents fetched successfully')
        except Exception as e:
            print(f'Failed to fetch agents from audit db: {e}')

    async def snapshot_agents(self, db_conn):
        try:
            print('Taking agents snapshot...')
            async with db_conn.transaction():
                await db_conn.execute('DELETE FROM agents_data.agents')
                for agent in self.agents.values():
                    values = agent.queue_id
                    await db_conn.execute(
                        '''
                        INSERT INTO agents_data.agents (queue_id)
                        VALUES ($1)
                        ''', 
                        values
                    )
            print('Taking agents snapshot successfully')
        except Exception as e:
            print(f'Failed to take agents snapshot: {e}')