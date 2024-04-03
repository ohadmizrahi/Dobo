import asyncpg
from pydantic import BaseSettings

DAY = 86400
HOUR = 3600
MINUTE = 60
SECOND = 1

class AgentManagerSettings(BaseSettings):
    CLEANUP_INTERVAL: int = DAY
    AGENT_TIMEOUT: int = 5*HOUR
    SNAPSHOT_INTERVAL: int = 1*MINUTE # 10*MINUTE
    AGENT_SLEEPING_INTERVAL: int = 40*SECOND


    class Config:
        env_file = ".env"

settings = AgentManagerSettings()

