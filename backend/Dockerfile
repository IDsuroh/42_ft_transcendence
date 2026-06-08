# Start from a stable small linux image that has python
FROM    python:3.13-slim

# In the container, use /app as the current folder (if /app doesn't exist, Docker creates it)
WORKDIR /app

# Do not create bytecode cache files to keep project clean
# Print python output immediately to show logs instead of storing it temporarily
ENV     PYTHONDONTWRITEBYTECODE=1
ENV     PYTHONUNBUFFERED=1

# Copy requriements.txt into /app/requirements.txt (For Docker's dependencies)
COPY    requirements.txt .

# Update python package installer (pip) and Install everything in requirements.txt\
# -r means requirement file, --no-cache-dir means don't keep pip's download cache
# For example, packages will be in /usr/local/lib/python3.13/site-packages/
RUN     pip install --upgrade pip
RUN     pip install --no-cache-dir -r requirements.txt

# For the container to have the project code
# Copying twice so that rebuilding is faster
COPY    . .

# Document the port number (Doesn't publish)
EXPOSE  8000

# Run Django via python, this is the basic Django development command
# manage.py is a Django-generated Python Script (kinda like a control panel)
# Running the "development server" which is for development
# 0.0.0.0 means "listen on all available network interfaces"
# We gotta change this in the future
# CMD     ["python", "manage.py", "runserver", "0.0.0.0:8000"]

# Start Gunicorn instead of Django's development server.
# config.wsgi:application means:
# - load backend/config/wsgi.py
# - use the application object inside that file
# Gunicorn listens on port 8000 inside the backend container.
CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000"]

# / Django Python Container
# ├── app/
# │   ├── requirements.txt
# │   ├── manage.py
# │   └── config/
# │
# └── usr/
#     └── local/
#         └── lib/
#             └── python3.12/
#                 └── site-packages/
#                     ├── django/
#                     ├── psycopg/
#                     └── decouple/