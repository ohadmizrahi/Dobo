import asyncio
import os
import sys

from dotenv import load_dotenv
from fastapi import FastAPI
from pathlib import Path
from starlette.responses import JSONResponse

path = Path(__file__).resolve()

while path.name != 'Dobo' and path.name != '':
    path = path.parent

if path.name == 'Dobo':
    sys.path.append(str(path))

from services.config.rabbit_mq import RabbitMQConfig
from services.bon_handler.api.orchestrator import Orchestrator
from services.bon_handler.api.consumer import RabbitMQConsumer
from services.bon_handler.api.processor import PrinterProcessor
from services.bon_handler.api.printers import CupsPrinter

app = FastAPI()

ORCHESTRATORS = []
TASKS = []
os.environ['BUSINESS_ID'] = '1'
os.environ['PRINTER_ID'] = 'home'

@app.on_event('startup')
async def startup_event():
    print(f"Starting bon handler server for business {os.environ['BUSINESS_ID']}...")
    
    print('Loading environment variables...')
    success = load_dotenv("../.env")
    if not success:
        print("Warning: local .env file not found")
        print("Searcing for environment variables...")
        run_env = os.getenv('RUN_ENV', 'local')
        if run_env == 'local':
            raise Exception('Environment variables not found when running locally.')
        print("Environment variables found.\nStarting service...")

    try:
        rabbit_printer_orchestrator = await Orchestrator(
            RabbitMQConsumer(RabbitMQConfig()),
            PrinterProcessor(os.environ['BUSINESS_ID'], CupsPrinter(os.environ['PRINTER_ID']))
        ).setup()

        ORCHESTRATORS.append(rabbit_printer_orchestrator)
        
        TASKS.append(
            asyncio.create_task(
                rabbit_printer_orchestrator.run()
            )
        )

    except Exception as e:
        print(f"Error during startup: {e}")

@app.on_event('shutdown')
async def shutdown_event():
    print(f"Shutting down bon handler server for business {os.environ['BUSINESS_ID']}...")
    try:
        print("Stopping orchestrators...")
        [orchestrator.stop() for orchestrator in ORCHESTRATORS]
        
        print("Cancelling tasks...")
        [task.cancel() for task in TASKS]

    except Exception as e:
        print(f"Error during shutdown: {e}")


