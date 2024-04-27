import os
import aio_pika
from pydantic import BaseSettings

class RabbitMQConfig(BaseSettings):
    broker_host: str = os.getenv('BROKER_HOST')
    broker_port: int = int(os.getenv('BROKER_PORT', 5672))
    broker_username: str = os.getenv('BROKER_USERNAME')
    broker_password: str = os.getenv('BROKER_PASSWORD')

    class Config:
        env_file = "../.env"

    async def connect(self):
        connection_string = f"amqp://{self.broker_username}:{self.broker_password}@{self.broker_host}:{self.broker_port}/"
        connection = await aio_pika.connect_robust(connection_string)
        return connection

