# 42_ft_transcendence

Transcendence is a full-stack web application project built for the 42 curriculum.

This repository currently contains the mandatory base infrastructure:

- Django backend
- Django REST Framework API
- PostgreSQL database
- React frontend with Vite
- Tailwind CSS
- Docker Compose
- Nginx reverse proxy
- HTTPS with a local self-signed certificate
- Session-based authentication with CSRF protection
- Signup, login, current-user check, and logout flow
- Privacy Policy and Terms of Service pages

## Tech Stack

### Backend

- Python
- Django
- Django REST Framework
- PostgreSQL
- psycopg
- python-decouple
- django-cors-headers

### Frontend

- React
- Vite
- Tailwind CSS
- React Router

### Infrastructure

- Docker
- Docker Compose
- Nginx (Reverse Proxy)
- HTTPS with local self-signed certificates

Web server
= can directly serve files/content. It receives a request and directly gives back files.

Reverse proxy
= forwards requests to another server. It receives a request, but instead of answering by itself, it forwards the request to another server/service.

Nginx
= can do both, depending on configuration.

## Project Structure

```text
transcendence/
├── backend/
│   ├── config/
│   ├── users/
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── Dockerfile
│   └── package.json
├── nginx/
│   ├── certs/
│   └── default.conf
├── docker-compose.yml
├── .env.example
└── README.md
```

## Environment Variables

Create a `.env` file in the project root.

You can copy the example file:

```bash
cp .env.example .env
```

Example variables:

```env
# Django/backend settings
SECRET_KEY=change-me
DEBUG=True

# PostgreSQL database settings
POSTGRES_DB=transcendence
POSTGRES_USER=transcendence_user
POSTGRES_PASSWORD=change-me
POSTGRES_HOST=db
POSTGRES_PORT=5432
```

The real `.env` file should not be committed to Git.

## HTTPS Certificate Setup

For local HTTPS development, generate a self-signed certificate:

```bash
mkdir -p nginx/certs

openssl req -x509 -nodes -days 365 \
  -newkey rsa:2048 \
  -keyout nginx/certs/localhost.key \
  -out nginx/certs/localhost.crt \
  -subj "/CN=localhost"
```

This creates:

```text
nginx/certs/localhost.crt
nginx/certs/localhost.key
```

The certificate is self-signed, so the browser may show a security warning when visiting:

```text
https://localhost
```

For local development, choose the advanced/proceed option in the browser.

## Run the Project

From the project root:

```bash
docker compose up --build
```

Then open:

```text
https://localhost/
```

Available frontend pages:

```text
https://localhost/signup
https://localhost/login
https://localhost/home
https://localhost/privacy
https://localhost/terms
```

## Docker Services

Docker Compose starts these services:

```text
db        PostgreSQL database
backend   Django backend API
frontend  React/Vite frontend
nginx     HTTPS reverse proxy
```

The browser connects to Nginx first:

```text
Browser
  ↓ HTTPS
Nginx
  ↓
Frontend or Backend
```

Nginx routes requests like this:

```text
/      → frontend container
/api/  → backend container
```

## Backend API Endpoints

User authentication endpoints:

```text
POST /api/users/signup/   Create a new user
POST /api/users/login/    Log in an existing user
GET  /api/users/me/       Return the current logged-in user
POST /api/users/logout/   Log out the current user
```

## Authentication Flow

The project currently uses Django session authentication.

Login flow:

```text
React login page
  ↓
POST /api/users/login/
  ↓
Django validates email/password
  ↓
Django creates a session
  ↓
Browser stores sessionid cookie
```

Current-user flow:

```text
React home page
  ↓
GET /api/users/me/
  ↓
Browser sends sessionid cookie
  ↓
Django identifies request.user
```

Logout flow:

```text
React home page
  ↓
POST /api/users/logout/
  ↓
Browser sends sessionid cookie and CSRF token
  ↓
Django destroys the session
```

CSRF protection is enabled for unsafe requests such as signup, login, and logout.

## Frontend Routes

React Router handles these frontend routes:

```text
/signup   Signup page
/login    Login page
/home     Home page
/privacy  Privacy Policy
/terms    Terms of Service
```

## Current Status

Completed mandatory base features:

- Docker Compose infrastructure
- PostgreSQL database
- Django backend API
- React/Vite frontend
- Tailwind CSS styling
- React Router page structure
- Signup, login, current-user check, and logout flow
- CSRF/session-cookie handling
- CORS development configuration
- Nginx reverse proxy
- HTTPS local development setup
- Privacy Policy page
- Terms of Service page
- Basic frontend validation for empty fields

## Development Notes

> **Finalization note:**  
> This section should be revisited before final project submission.  
> The current setup still uses development servers, such as Django's development server for the backend and Vite's development server for the frontend.  
> During finalization, we should decide whether to keep this setup for evaluation or move closer to a production-style setup, such as serving the built frontend static files through Nginx.

The frontend currently runs using the Vite development server inside Docker.

The backend currently runs using Django's development server inside Docker.

When using Vite behind Nginx, the browser may show a Vite WebSocket/HMR warning in the console. This warning is related to development live reload and does not block the application logic.

For a more production-style frontend setup later, the frontend can be built with:

```bash
npm run build
```

and served as static files through Nginx.
**Django's development server for the backend and Vite's development server for the frontend.**

## Security Notes

- Passwords are handled by Django authentication and are not stored in plain text.
- Session cookies are used for authentication.
- CSRF tokens are used for unsafe requests.
- `.env` should not be committed.
- Local self-signed certificates are for development only.

## Certificate Key Note

The current repository may contain a local self-signed `localhost.key` used only for development HTTPS testing.

Before final cleanup, this should be revisited. Preferably:

- stop tracking `nginx/certs/localhost.key`
- add `nginx/certs/*.key` to `.gitignore`
- document certificate generation in this README
- regenerate local certificates if needed

## Useful Commands

Start the project:

```bash
docker compose up --build
```

Start in detached mode:

```bash
docker compose up --build -d
```

Stop containers:

```bash
docker compose down
```

View backend logs:

```bash
docker compose logs -f backend
```

View Nginx logs:

```bash
docker compose logs -f nginx
```

Check running containers:

```bash
docker compose ps
```

## Notes for Teammates

To run this project from a fresh clone:

```bash
cp .env.example .env
mkdir -p nginx/certs

openssl req -x509 -nodes -days 365 \
  -newkey rsa:2048 \
  -keyout nginx/certs/localhost.key \
  -out nginx/certs/localhost.crt \
  -subj "/CN=localhost"

docker compose up --build
```

Then open:

```text
https://localhost/
```

> [!NOTE]
> This section should be revisited before final project submission.
> The current setup still uses development servers, such as Django's development server for the backend and Vite's development server for the frontend.
> During finalization, we should decide whether to keep this setup for evaluation or move closer to a production-style setup, such as serving the built frontend static files through Nginx.
**Django's development server for the backend and Vite's development server for the frontend.**