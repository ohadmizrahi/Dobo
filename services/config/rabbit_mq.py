import os
import aio_pika

from urllib.parse import quote
from pydantic import BaseSettings

class RabbitMQConfig(BaseSettings):
    broker_host: str = os.getenv('BROKER_HOST')
    broker_port: str = os.getenv('BROKER_PORT', 5671)
    broker_username: str = os.getenv('BROKER_USERNAME')
    broker_password: str = os.getenv('BROKER_PASSWORD')

    async def connect(self):
        connection_string = f"amqps://{self.broker_username}:{quote(self.broker_password.encode(), safe='')}@{self.broker_host}:{self.broker_port}/"
        connection = await aio_pika.connect_robust(connection_string)
        return connection

