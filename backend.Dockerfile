# Use base image with Python 3.10
FROM python:3.10

# Set container's working directory
WORKDIR /app

# Add requirements
COPY ./backend /app

# Install packages
RUN pip install --no-cache-dir -r requirements.txt

# Expose port 8080
EXPOSE 8080

# Run the backend application
CMD ["python", "-m", "backend.main"]