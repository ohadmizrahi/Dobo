#!/bin/bash

exec uvicorn ../services.producer.producer_service:app --port 8001 --reload