FROM node:16

WORKDIR /usr/src

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install --only=dev
RUN npm install -g nodemon

CMD NODE_OPTIONS="--max-old-space-size=4096" nodemon --inspect=0.0.0.0 dist/bot.js