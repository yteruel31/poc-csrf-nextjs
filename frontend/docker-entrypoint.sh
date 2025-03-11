#!/bin/sh

# Set the backend URL with a default value if not provided
export NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL:-http://backend:8000}

# Execute the command passed to docker run
exec "$@"
