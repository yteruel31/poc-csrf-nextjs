FROM python:3.11-slim

WORKDIR /app

# Install dependencies and add PostgreSQL client tools for DB checks
RUN apt-get update && apt-get install -y --no-install-recommends \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first for better caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire project
COPY . .

# Create necessary directories
RUN mkdir -p /app/staticfiles && chmod 777 /app/staticfiles
RUN mkdir -p /app/api/migrations && chmod 777 /app/api/migrations
RUN touch /app/api/migrations/__init__.py

# Make scripts executable
RUN chmod +x /app/entrypoint.sh
RUN chmod +x /app/manage.py
RUN chmod +x /app/init_django.py
RUN chmod +x /app/create_migrations.py

# Set environment variables
ENV PYTHONPATH=/app:$PYTHONPATH
ENV DJANGO_SETTINGS_MODULE=myproject.settings

# Run the entrypoint script
ENTRYPOINT ["/bin/bash", "/app/entrypoint.sh"]

# Run server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
