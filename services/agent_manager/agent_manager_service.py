import os
import sys
import pytz
import asyncpg

from dotenv import load_dotenv
from fastapi import FastAPI
from pathlib import Path
from starlette.responses import JSONResponse
from apscheduler.schedulers.asyncio import AsyncIOScheduler

path = Path(__file__).resolve()

while path.name != 'Dobo' and path.name != '':
    path = path.parent

if path.name == 'Dobo':
    sys.path.append(str(path))

from services.config.rabbit_mq import RabbitMQConfig
from services.config.postgres import PostgresConfig
from services.config.agent_manager import settings
from services.agent_manager.consts import INTERVAL
from services.agent_manager.api.queue_handler.business_producer import Producer
from services.agent_manager.api.agent_handler.agent_manager import AgentManager

app = FastAPI()
scheduler = AsyncIOScheduler()

agent_manager = None
broker_conn = None
db_conn = None

async def agent_manager_service_on_startup():
    print('Starting agent manager service...')
    
    print('Loading environment variables...')
    success = load_dotenv("../.env")
    if not success:
        print("Warning: local .env file not found")
        print("Searcing for environment variables...")
        run_env = os.getenv('RUN_ENV', 'local')
        if run_env == 'local':
            raise Exception('Environment variables not found when running locally.')
        print("Environment variables found.\nStarting service...")

    global agent_manager, broker_conn, db_conn
    scheduler.start()
    broker_conn = await RabbitMQConfig().connect()
    db_conn = await PostgresConfig().connect()

    producer = await Producer(broker_conn=broker_conn).setup()
    
    agent_manager = AgentManager(scheduler=scheduler, producer=producer)
    agent_manager.cleanning = scheduler.add_job(
        func=agent_manager.cleanup,
        trigger=INTERVAL,
        seconds=settings.CLEANUP_INTERVAL,
        timezone=pytz.utc
        )

    scheduler.add_job(
        func=agent_manager.snapshot_agents,
        args=[db_conn],
        trigger=INTERVAL,
        seconds=settings.SNAPSHOT_INTERVAL,
        timezone=pytz.utc
        )

    await agent_manager.fetch_agents_from_snapshot(
        db_conn=db_conn,
        broker_conn=broker_conn
        )

async def agent_manager_service_on_shutdown():
    print('Shutting down agent manager service...')
    
    agent_manager.scheduler.remove_job(agent_manager.cleanning.id)
    agent_manager.cleanning = None

    for agent in agent_manager.agents.values():
        agent_manager.scheduler.remove_job(agent.job.id)

    await agent_manager.snapshot_agents(db_conn=db_conn)
    
    await db_conn.close()
    await broker_conn.close()

@app.on_event('startup')
async def startup_event():
    await agent_manager_service_on_startup()

@app.on_event('shutdown')
async def shutdown_event():
    try:
        print('Shutting down agent manager service...')
        await agent_manager_service_on_shutdown()
    except Exception as e:
        print(f"Error during shutdown: {e}")

@app.get('/agents/start/{queue_id}', response_class=JSONResponse)
async def create_or_activate_agent(queue_id: str):
    responses = {
        'failed': JSONResponse(
            status_code=500,
            content={
                'error': f'Failed to create or activate agent for queue {queue_id}'
                }
        ),
        'created': JSONResponse(
            status_code=201,
            content={
                'queue_id': queue_id,
                'message': f'Agent for queue {queue_id} created'
                }
        ),
        'activated': JSONResponse(
            status_code=200, 
            content={
                'queue_id': queue_id,
                'message': f'Agent for queue {queue_id} activated'
                }
        )
    }
    try:
        print(f'Creating or activating agent with id: {queue_id}')
        res = await agent_manager.create_or_activate_agent(
            broker_conn=broker_conn,
            queue_id=queue_id
            )
        status = res.get('status', 'failed')
    except Exception as e:
        print(f'Error: {e}')
        return responses['failed']
    
    return responses[status]


@app.get('/agents/stop/{queue_id}', response_class=JSONResponse)
async def stop_agent(queue_id: str):
    responses = {
        'failed': JSONResponse(
            status_code=404,
            content={
                'message': f'queue {queue_id} not found'
                }
        ),
        'stopped': JSONResponse(
            status_code=200, 
            content={
                'queue_id': queue_id,
                'message': f'Agent for queue {queue_id} stopped'
                }
        )
    }
    print(f'Stopping agent {queue_id}')
    res = await agent_manager.stop_agent(agent_id=queue_id)
    status = res.get('status', 'failed')
    return responses[status]

@app.get('/test/agents', response_class=JSONResponse)
async def test_agents():
    return {'agents': {
        queue_id: agent.to_dict()
        for queue_id, agent
        in agent_manager.agents.items()
        }}

