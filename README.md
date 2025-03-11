# 🚀 Next.js + Django + Docker Compose Application
## 📋 Overview
This project demonstrates a full-stack web application with the following architecture:
- **Frontend**: Next.js with TypeScript and App Router
- **Backend**: Django REST Framework API
- **Database**: PostgreSQL
- **Orchestration**: Docker Compose

The application showcases a secure, production-ready setup with session-based authentication between a Next.js frontend and Django backend.
## ✨ Features
- **🐳 Containerized Architecture**: All components run in Docker containers
- **🔒 Session Authentication**: Secure cookie-based authentication between services
- **🖥️ Server-Side Rendering (SSR)**: Demonstrates fetching data during server rendering in Next.js
- **🔄 Client-Side Fetching**: Shows how to fetch data on the client side with authentication
- **🛡️ CSRF Protection**: Proper implementation of CSRF protection for unsafe methods
- **📝 TypeScript Integration**: Fully typed frontend with TypeScript
- **💾 Data Management**: Create, read, and update operations for items
- **🚪 Protected Routes**: Routes and API endpoints that require authentication

## 📁 Project Structure
``` 
nextjs-django-docker/
├── docker-compose.yml          # Docker Compose configuration
├── frontend/                   # Next.js frontend application
│   ├── Dockerfile              # Frontend container configuration
│   ├── docker-entrypoint.sh    # Runtime environment setup script
│   ├── next.config.js          # Next.js configuration
│   ├── package.json            # Frontend dependencies
│   ├── src/                    # Application source code
│   │   ├── app/                # Next.js App Router pages
│   │   ├── components/         # React components
│   │   ├── lib/                # Utility functions
│   │   └── types/              # TypeScript type definitions
│   └── tsconfig.json           # TypeScript configuration
└── backend/                    # Django backend application
    ├── Dockerfile              # Backend container configuration
    ├── entrypoint.sh           # Database wait and init script
    ├── manage.py               # Django management script
    ├── requirements.txt        # Python dependencies
    ├── myproject/              # Django project
    │   ├── settings.py         # Django settings
    │   ├── urls.py             # Main URL routing
    │   └── wsgi.py             # WSGI application
    └── api/                    # Django app for API
        ├── models.py           # Database models
        ├── serializers.py      # DRF serializers
        ├── urls.py             # API endpoint routing
        └── views.py            # API view logic
```
## 🚀 Setup and Installation
### Prerequisites
- Docker
- Docker Compose

### Running the Application
1. Clone the repository
2. Start the application:
``` bash
   docker-compose up -d
```
The application will be available at:
- 🌐 **Frontend**: [http://localhost:3000](http://localhost:3000)
- 🔌 **Backend API**: [http://localhost:8000](http://localhost:8000)
- 🗄️ **PostgreSQL**: localhost:5432

## 👤 Default Credentials
A default admin user is created:
- **Username**: admin
- **Password**: adminpassword

## 📱 Pages and Features
### 🏠 Home Page
- Introduction and navigation to example pages

### 🖥️ Server-Side Rendering Example
- Demonstrates fetching data from Django during Next.js server-side rendering
- Protected route requiring authentication
- Showcases forwarding of cookies from client to server to API

### 🔄 Client-Side Fetching Example
- Shows how to fetch data from Django on the client side
- Protected route with authentication checking
- Includes authentication state management

### ✏️ Edit Item Page
- Form to update an item's details
- Demonstrates PUT requests with authentication and CSRF protection
- Shows handling of API responses and errors

## 🔌 API Endpoints
The backend exposes these key endpoints:
### 🔐 Authentication
- `POST /api/auth/login/`: Log in a user
- `POST /api/auth/logout/`: Log out a user
- `GET /api/auth/user/`: Get the current user info

### 🛡️ CSRF Protection
- `GET /api/csrf-token/`: Get a CSRF token for unsafe methods

### 💾 Data Management
- `GET /api/items/`: List all items (protected)
- `GET /api/items/{id}/`: Get a specific item (protected)
- `PUT /api/items/{id}/`: Update a specific item (protected)
