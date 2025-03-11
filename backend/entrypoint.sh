#!/bin/bash
set -e

# Export Django settings module for all commands
export DJANGO_SETTINGS_MODULE=myproject.settings
export PYTHONPATH=/app:$PYTHONPATH

# Ensure staticfiles directory exists and has proper permissions
mkdir -p /app/staticfiles
chmod 777 /app/staticfiles

echo "Waiting for PostgreSQL..."
while ! pg_isready -h ${POSTGRES_HOST} -p ${POSTGRES_PORT} -U ${POSTGRES_USER}; do
  sleep 1
done
echo "PostgreSQL started"

# Create migrations if they don't exist
echo "Creating migrations..."
python manage.py makemigrations

# Apply migrations
echo "Applying migrations..."
python manage.py migrate

# Verify the database structure
echo "Checking database..."
python manage.py dbshell <<< "\dt api_item"

# Collect static files
echo "Collecting static files..."
python manage.py collectstatic --noinput

# Initialize Django data
echo "Initializing data..."
python init_django.py

# Execute the command provided as arguments
exec "$@"
