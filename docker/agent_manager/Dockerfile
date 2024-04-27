# Use an official Python runtime as a base image
FROM python:3.10-slim-buster

WORKDIR /Dobo/services/

# Copy the requirements.txt file into the container
COPY ./services/requirements.txt ./

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY ./services/config ./config
COPY ./services/agent_manager ./agent_manager

WORKDIR /Dobo/services/agent_manager
# Make port 80 available to the world outside this container
EXPOSE 8000

# Run the service when the container launches
CMD ["uvicorn", "agent_manager_service:app", "--host", "0.0.0.0", "--port", "8000"]