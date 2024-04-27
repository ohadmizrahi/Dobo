# Use an official Python runtime as a base image
FROM python:3.10-slim-buster

# Set the working directory in the container to /app
WORKDIR /Dobo/services/bon_handler

# Copy the requirements.txt file into the container
COPY services/requirements.txt ./

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY services/config .
COPY services/bon_handler ./bon_handler

WORKDIR /Dobo/services/bon_handler
# Run the service when the container launches
CMD ["uvicorn", "bon_handler_service:app", "--host", "0.0.0.0", "--port", "8001"]