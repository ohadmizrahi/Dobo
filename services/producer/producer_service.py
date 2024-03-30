import sys
import pytz

from fastapi import FastAPI
from pathlib import Path
from starlette.responses import JSONResponse

path = Path(__file__).resolve()

while path.name != 'Dobo' and path.name != '':
    path = path.parent

if path.name == 'Dobo':
    sys.path.append(str(path))

from services.config.rabbit_mq import RabbitMQConfig

app = FastAPI()
connection = None 

@app.on_event("startup")
async def startup_event():
    global connection
    config = RabbitMQConfig(
        host='localhost',
        port=5672,
        username='guest',
        password='guest',
        vhost='/'
        )
    connection = await config.connect()

@app.on_event("shutdown")
async def shutdown_event():
    await connection.close()

@app.post("/producer/order/", response_class=JSONResponse)
async def procceed_new_order(order: str):
    print(f"Processing order {order}")
    responses = {
        "failed": JSONResponse(
            status_code=500,
            content={
                "message": "Failed to process order"
                }
        ),
        "created": JSONResponse(
            status_code=201,
            content={
                'queue_id': "order-queue",
                "message": f"Order {order} processed successfully"
                }
        ),
        "activated": JSONResponse(
            status_code=200, 
            content={
                'queue_id': "order-queue",
                "message": f"Order {order} processed successfully"
                }
        )
    }

    return JSONResponse(
        status_code=200,
        content={
            'queue_id': "order-queue",
            "message": f"Order {order} processed successfully"
            }
    )