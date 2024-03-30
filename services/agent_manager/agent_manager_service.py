import sys
import pytz

from fastapi import FastAPI
from pathlib import Path
from starlette.responses import JSONResponse

path = Path(__file__).resolve()

while path.name != 'Dobo' and path.name != '':
    path = path.parent

if path.name == 'Dobo':
    sys.path.append(str(path))

from services.config.rabbit_mq import RabbitMQConfig

from services.agent_manager.api.agent import AgentManager
from services.agent_manager.scheduler import scheduler



app = FastAPI()
agent_manager = None
connection = None

async def agent_manager_service_on_startup():
    global agent_manager, connection
    scheduler.start()
    config = RabbitMQConfig(
        host='localhost',
        port=5672,
        username='guest',
        password='guest',
        vhost='/'
        )
    connection = await config.connect()
    agent_manager = AgentManager(scheduler=scheduler)
    agent_manager.cleanning = scheduler.add_job(
        func=agent_manager.cleanup,
        trigger="interval",
        seconds=10,
        timezone=pytz.utc
        )

async def agent_manager_service_on_shutdown():
    agent_manager.cleanning.cancel()
    agent_manager.cleanning = None
    for agent in agent_manager.agents.values():
        agent.job.cancel()
    await connection.close()

@app.on_event("startup")
async def startup_event():
    await agent_manager_service_on_startup()

@app.on_event("shutdown")
async def shutdown_event():
    agent_manager_service_on_shutdown()

@app.get("/agents/{queue_id}", response_class=JSONResponse)
async def create_or_activate_agent(queue_id: str):
    responses = {
        "failed": JSONResponse(
            status_code=500,
            content={
                "message": f"Failed to create or activate agent for queue {queue_id}"
                }
        ),
        "created": JSONResponse(
            status_code=201,
            content={
                'queue_id': queue_id,
                "message": f"Agent for queue {queue_id} created"
                }
        ),
        "activated": JSONResponse(
            status_code=200, 
            content={
                'queue_id': queue_id,
                "message": f"Agent for queue {queue_id} activated"
                }
        )
    }

    res = await agent_manager.create_or_activate_agent(connection=connection, queue_id=queue_id)
    status = res.get("status", "failed")
    return responses[status]

@app.get("/test/agents", response_class=JSONResponse)
async def test_agents():
    return {"agents": {
        queue_id: agent.to_dict()
        for queue_id, agent
        in agent_manager.agents.items()
        }}

