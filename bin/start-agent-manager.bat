
call ..\services\services_venv\Scripts\activate
uvicorn ..\services\agent_manager\agent_manager_service:app --port 8000 --reload