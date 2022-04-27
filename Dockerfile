FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./backend ./backend
RUN npm i
EXPOSE 80

CMD ["npm","run","start"]