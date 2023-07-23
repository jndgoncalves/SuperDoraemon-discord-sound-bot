FROM node:latest

WORKDIR /usr/src

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install --only=dev
RUN npm install -g nodemon

CMD NODE_OPTIONS="--max-old-space-size=4096" nodemon --inspect=0.0.0.0 dist/bot.js

# Debug deploy-commands.js
#CMD NODE_OPTIONS="--max-old-space-size=4096" nodemon --inspect=0.0.0.0 dist/deploy-commands.js

# Essentially a command that waits indefinitely and does nothing. It's often used in Docker containers to keep them running, because Docker containers stop when their main process finishes
#CMD tail -f /dev/null