FROM node

WORKDIR /

COPY package.json .

RUN npm install

COPY . .

ENV PORT=8000

EXPOSE $PORT

CMD [ "node", "./dist/main.js" ]