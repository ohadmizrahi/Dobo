from fastapi import FastAPI

from routes.agent_manager import router as agent_router, agent_manager
from scheduler import scheduler

app = FastAPI()

app.include_router(agent_router, prefix="/api")

@app.on_event("startup")
async def startup_event():
    scheduler.add_job(agent_manager.cleanup, "interval", seconds=10)

