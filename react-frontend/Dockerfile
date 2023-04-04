# Frontend Dockerfile -> belongs in same folder as React files
FROM node:16
WORKDIR /usr/src/app

EXPOSE 3000

RUN npm install --save react-router-dom
RUN npm install --save @fortawesome/fontawesome-svg-core
RUN npm install --save @fortawesome/free-solid-svg-icons
RUN npm install --save @fortawesome/react-fontawesome

COPY . .

CMD npm start