FROM node:16

WORKDIR /usr/src

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install --only=dev
RUN npm install -g nodemon
RUN npm run build

CMD [ "nodemon", "--inspect=0.0.0.0", "dist/bot.js" ]