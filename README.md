# 42_ft_transcendence

Transcendence is a full-stack web application project built for the 42 curriculum.

This repository currently contains the mandatory base infrastructure:

- Django backend
- Django REST Framework API
- Gunicorn backend application server
- PostgreSQL database
- React frontend built with Vite and served by Nginx
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
- Gunicorn
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

This project uses HTTPS locally through certificates mounted into the Nginx container.

Certificate files are expected at:

```text
nginx/certs/localhost.crt
nginx/certs/localhost.key
```

These files are generated locally and should not be committed to Git.

### Recommended method: mkcert

For a cleaner local Chrome experience, use `mkcert` to create a locally trusted certificate.

Install the required browser trust tooling:

```bash
sudo apt update
sudo apt install libnss3-tools
```

Install `mkcert`:

```bash
sudo apt install mkcert
```

If `mkcert` is not available through your package manager, install it using the official method for your operating system.

Then install the local certificate authority:

```bash
mkcert -install
```

Generate the localhost certificate:

```bash
mkdir -p nginx/certs

mkcert -key-file nginx/certs/localhost.key \
  -cert-file nginx/certs/localhost.crt \
  localhost 127.0.0.1 ::1
```

This creates:

```text
nginx/certs/localhost.crt
nginx/certs/localhost.key
```

Nginx uses these files to serve the project through:

```text
https://localhost/
```

### Alternative method: OpenSSL self-signed certificate

If `mkcert` is not used, a self-signed certificate can be generated with OpenSSL:

```bash
mkdir -p nginx/certs

openssl req -x509 -nodes -days 365 \
  -newkey rsa:2048 \
  -keyout nginx/certs/localhost.key \
  -out nginx/certs/localhost.crt \
  -subj "/CN=localhost"
```

This also enables HTTPS, but Chrome may show a warning such as:

```text
net::ERR_CERT_AUTHORITY_INVALID
```

because the certificate is self-signed and not trusted by the operating system/browser.

## Run the Project

From the project root:

```bash
docker compose up --build -d
```

Apply database migrations:

```bash
docker compose exec backend python manage.py migrate
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

Why migrations are needed:

```text
Django migrations create or update the database tables required by the project.

For example:
- user table
- session table
- Django internal tables
```

This step is required after a fresh database is created, for example after a fresh clone or after running:

```bash
docker compose down -v
```

## Docker Services

Docker Compose starts these services:

```text
db        PostgreSQL database
backend   Django backend API running through Gunicorn
frontend  React/Vite build service that creates static frontend files
nginx     HTTPS reverse proxy and static frontend server
```

The browser connects to Nginx first:

```text
Browser
  ↓ HTTPS
Nginx
  ↓
Built React static files or backend API
```

Nginx routes requests like this:

```text
/      → built React static files served by Nginx
/api/  → backend container running Gunicorn/Django
```

## Frontend Build

The frontend is built with Vite using:

```bash
npm run build
```

During Docker image build, the frontend service creates production frontend files in:

```text
/app/dist
```

That folder is stored in the Docker named volume:

```text
frontend_dist
```

Nginx mounts the same volume at:

```text
/usr/share/nginx/html
```

This allows Nginx to serve the built React frontend directly.

React Router frontend routes such as `/signup`, `/login`, `/home`, `/privacy`, and `/terms` are handled by Nginx returning `index.html` when the requested path is not a real file.

## Backend Server

The backend runs through Gunicorn instead of Django's development server.

Request flow:

```text
Browser
  ↓ HTTPS
Nginx
  ↓ /api/
Gunicorn
  ↓
Django
```

Gunicorn runs Django through the WSGI application:

```text
config.wsgi:application
```

This makes the backend setup closer to a deployment-style configuration.

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

## Security Notes

- Passwords are handled by Django authentication and are not stored in plain text.
- Session cookies are used for authentication.
- CSRF tokens are used for unsafe requests.
- `.env` should not be committed.
- Local self-signed certificates are for development only.

## Certificate Key Note

Local HTTPS certificate files are generated for development and should not be committed to Git.

The following files are ignored:

```text
nginx/certs/*.key
nginx/certs/*.crt
nginx/certs/*.pem
```

The private key file is especially sensitive:

```text
nginx/certs/localhost.key
```

Each developer should generate their own local certificates by following the HTTPS Certificate Setup section.

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
```

Generate local HTTPS certificates.

Recommended method using `mkcert`:

```bash
mkdir -p nginx/certs

mkcert -key-file nginx/certs/localhost.key \
  -cert-file nginx/certs/localhost.crt \
  localhost 127.0.0.1 ::1
```

If `mkcert` is not available, you can use an OpenSSL self-signed certificate instead:

```bash
mkdir -p nginx/certs

openssl req -x509 -nodes -days 365 \
  -newkey rsa:2048 \
  -keyout nginx/certs/localhost.key \
  -out nginx/certs/localhost.crt \
  -subj "/CN=localhost"
```

The OpenSSL method enables HTTPS, but Chrome may show a certificate trust warning because the certificate is self-signed.

Start the project:

```bash
docker compose up --build -d
```

Apply database migrations:

```bash
docker compose exec backend python manage.py migrate
```

Django migrations create or update the database tables required by the project, such as user, session, and internal Django tables.

This migration step is required after a fresh clone or after resetting Docker volumes with:

```bash
docker compose down -v
```

Then open:

```text
https://localhost/
```

Available pages:

```text
https://localhost/signup
https://localhost/login
https://localhost/home
https://localhost/privacy
https://localhost/terms
```
