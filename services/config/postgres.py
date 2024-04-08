import asyncpg
from pydantic import BaseSettings

class PostgresConfig(BaseSettings):
    pg_user: str
    pg_password: str
    database: str
    pg_host: str
    pg_port: int

    class Config:
        env_file = "../.env"

    async def connect(self):
        connection = await asyncpg.connect(
            user=self.pg_user,
            password=self.pg_password,
            database=self.database,
            host=self.pg_host,
            port=self.pg_port
        )
        return connection

