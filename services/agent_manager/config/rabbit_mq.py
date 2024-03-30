import aio_pika

class RabbitMQConfig:
    def __init__(self, host, port, username, password, vhost):
        self.host = host
        self.port = port
        self.username = username
        self.password = password
        self.vhost = vhost
    
    async def connect(self):
        connection = await aio_pika.connect_robust(f"amqp://{self.username}:{self.password}@{self.host}:{self.port}/{self.vhost}")
        return connection

