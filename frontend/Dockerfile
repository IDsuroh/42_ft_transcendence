# Node.js image because Vite/npm runs through Node.js through Alpine lightweight Linux image
# Node.js could be a framework but in our case, is just an environment that lets JavaScript run
# "OUT OF THE BROWSER" (This is important because outside the browser, there is simply no engine to
# run JavaScript)
# So, we are using Node.js/npm as a tool environment used to 'install' and 'run' frontend JavaScript
# packages such as "Vite", "React", and "Tailwind"
FROM    node:22-alpine

# Set working directory inside the container.
# Use /app as the main folder so that commands happen inside /app.
WORKDIR /app

# Copies files from the local frontend folder into the container's app folder (package files)
# package*.json matches files like package.json, package-lock.json, etc.
# Copy these first because npm install only depends on these files.
COPY    package*.json ./

# Runs inside the container to install JavaScript packages listed in package.json
RUN     npm install

# Copies the rest of the frontend project into the container
COPY    . .

# Build the React/Vite frontend into static production files.
# This creates the /app/dist folder.
# The dist folder contains browser-ready HTML, CSS, JavaScript, and assets.
# After this, the frontend does not need to run the Vite development server.
# Nginx will serve these built static files instead.
RUN     npm run build

# The order of building images is as it is because of 'Docker caching'
# So that it would be faster to rebuild for multiple testing and etc.

# This container expects to use port 5173
# EXPOSE  5173

# Start the Vite development server
# CMD     ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# We don't need these two lines for finalization.

# Docker caching note:
# package*.json is copied before the rest of the source code so npm install can be cached.
# If only React source files change, Docker can reuse the npm install layer and rebuild faster.