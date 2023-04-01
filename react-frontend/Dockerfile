# Frontend Dockerfile -> belongs in same folder as React files
FROM node:16
WORKDIR /usr/src/app

EXPOSE 3000

RUN npm install --save react-router-dom

COPY . .

CMD npm start