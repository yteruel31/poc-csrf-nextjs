#!/usr/bin/env python
"""
Script to manually generate migrations if needed.
This can help diagnose migration issues.
"""
import os
import sys
import django

# Set the Django settings module explicitly
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')

# Initialize Django
django.setup()

# Import necessary Django modules
from django.core.management import call_command

print("Creating migrations for api app...")
try:
    # Create migrations for the api app
    call_command('makemigrations', 'api', interactive=False)
    print("Migrations created successfully")
except Exception as e:
    print(f"Error creating migrations: {e}")
    sys.exit(1)

print("Listing migrations...")
try:
    # List migrations
    call_command('showmigrations', 'api')
except Exception as e:
    print(f"Error showing migrations: {e}")
    sys.exit(1)

print("Migration creation process completed")
