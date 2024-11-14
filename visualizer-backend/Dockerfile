# Use an official Python runtime as the base image
FROM python:3.10-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container
COPY visualizer-backend/requirements.txt ./

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the backend code into the container
COPY visualizer-backend/ ./

# Expose the backend port
EXPOSE 8000

# Run the backend server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
