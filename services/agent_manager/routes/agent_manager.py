import asyncio
import sys

from fastapi import APIRouter
from pathlib import Path

sys.path.append(str(Path(__file__).parent.parent))

from api.agent import AgentManager
from scheduler import scheduler


router = APIRouter()
agent_manager = AgentManager(scheduler)

@router.on_event("shutdown")
async def shutdown_event():
    agent_manager.cleanning.cancel()
    agent_manager.cleanning = None

@router.get("/agents/{group_id}")
async def create_or_activate_agent(group_id: str):
    await agent_manager.create_or_activate_agent(group_id)
    return {"message": f"Agent activated for group {group_id}"}

@router.get("/agents")
async def agents():
    return {"agents": {group_id: agent.to_dict() for group_id, agent in agent_manager.agents.items()}}

@router.get("/tasks")
async def tasks():
    current_task = asyncio.current_task()  # Get the current task
    tasks = [t for t in asyncio.all_tasks() if t is not current_task]  # Get all tasks except the current one
    print(len(tasks))
    return {}



