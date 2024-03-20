from fastapi import FastAPI

from routes.agent_manager import router as agent_router

app = FastAPI()

app.include_router(agent_router, prefix="/api")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)
