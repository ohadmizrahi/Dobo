import os
import asyncpg
from pydantic import BaseSettings

class PostgresConfig(BaseSettings):
    pg_user: str = os.getenv('PG_USER')
    pg_password: str = os.getenv('PG_PASSWORD')
    database: str = os.getenv('DATABASE')
    pg_host: str = os.getenv('PG_HOST')
    pg_port: int = int(os.getenv('PG_PORT', 5432))

    # class Config:
    #     env_file = "../.env"

    async def connect(self):
        connection = await asyncpg.connect(
            user=self.pg_user,
            password=self.pg_password,
            database=self.database,
            host=self.pg_host,
            port=self.pg_port
        )
        return connection

