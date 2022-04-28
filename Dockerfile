FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./backend ./backend
RUN npm i
# EXPOSE 5000

CMD ["npm","run","start"]s