FROM node:18.2.0
WORKDIR /app
ARG NODE_ENV=production
COPY ./package*.json ./
RUN npm install
COPY . /app
CMD ["npm", "run", "start"]