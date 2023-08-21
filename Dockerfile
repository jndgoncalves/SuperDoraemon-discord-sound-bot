# Use the latest version of the Node.js image as the base image
FROM node:latest

RUN apt-get update
RUN apt-get install -y ffmpeg

# Set the working directory in the container to /usr/src
WORKDIR /usr/src

# Copy package.json and package-lock.json to the container
COPY package*.json ./

RUN npm install

# Copy the rest of the application files to the container
COPY . .

RUN npm install --only=dev
# Install nodemon globally for hot-reloading during development
RUN npm install -g nodemon

# Start the bot using nodemon and enable debugging
CMD nodemon --inspect=0.0.0.0 dist/bot.js

# Debug deploy-commands.js
#CMD nodemon --inspect=0.0.0.0 dist/deploy-commands.js

# Essentially a command that waits indefinitely and does nothing. It's often used in Docker containers to keep them running, because Docker containers stop when their main process finishes
#CMD tail -f /dev/null