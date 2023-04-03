# Backend Dockerfile -> belongs in same folder as server.js
FROM node:16
WORKDIR /usr/src/app

EXPOSE 3080

RUN npm init -y
RUN npm install --save express
RUN npm install --save body-parser
RUN npm install --save mysql
RUN npm install --save cors
RUN npm install --save crypto

RUN npm install --save nodemon

COPY server.js .

CMD [ "node", "server.js" ]