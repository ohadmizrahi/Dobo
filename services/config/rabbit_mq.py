import aio_pika
from pydantic import BaseSettings

class RabbitMQConfig(BaseSettings):
    broker_host: str
    broker_port: int
    broker_username: str
    broker_password: str

    class Config:
        env_file = "../.env"

    async def connect(self):
        connection_string = f"amqp://{self.broker_username}:{self.broker_password}@{self.broker_host}:{self.broker_port}/"
        connection = await aio_pika.connect_robust(connection_string)
        return connection

