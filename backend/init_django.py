#!/usr/bin/env python
"""
Django initialization script for creating admin user and sample data.
This script should be run after Django is properly set up.
"""
import os
import sys
import django
import time

# Set the Django settings module explicitly
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')

# Initialize Django
django.setup()

# Import models after Django is set up
from django.contrib.auth.models import User
from django.db import IntegrityError, connection, ProgrammingError

# Verify that the api_item table exists
def check_table_exists():
    with connection.cursor() as cursor:
        cursor.execute(
            "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'api_item')"
        )
        return cursor.fetchone()[0]

# Wait for table to be available (migrations might take time)
max_attempts = 5
attempts = 0
while attempts < max_attempts:
    try:
        if check_table_exists():
            print("Table api_item exists, proceeding...")
            break
        else:
            print("Table api_item does not exist yet, waiting...")
            attempts += 1
            time.sleep(2)
    except Exception as e:
        print(f"Error checking table existence: {e}")
        attempts += 1
        time.sleep(2)

if attempts >= max_attempts:
    print("Warning: Could not verify table api_item exists after multiple attempts")

# Create a superuser if it doesn't exist
try:
    superuser = User.objects.filter(username='admin').exists()
    if not superuser:
        User.objects.create_superuser('admin', 'admin@example.com', 'adminpassword')
        print("Created default admin user")
    else:
        print("Admin user already exists")
except Exception as e:
    print(f"Error checking/creating superuser: {e}")

# Add sample data
try:
    # Import here to ensure the model is fully loaded
    from api.models import Item

    # Check if the table exists before trying to query it
    if check_table_exists():
        # Create sample items if none exist
        if Item.objects.count() == 0:
            items = [
                Item(name="Item 1", description="This is the first sample item"),
                Item(name="Item 2", description="This is the second sample item"),
                Item(name="Item 3", description="This is the third sample item"),
            ]
            Item.objects.bulk_create(items)
            print("Created sample items")
        else:
            print("Sample items already exist")
    else:
        print("Warning: api_item table does not exist, skipping sample data creation")
except ProgrammingError as e:
    print(f"Database error: {e}")
    print("This likely means migrations haven't been applied correctly")
except Exception as e:
    print(f"Error creating sample data: {e}")
    print(f"Exception type: {type(e)}")

print("Django initialization completed")
