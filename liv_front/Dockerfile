FROM node:24-alpine
LABEL maintainer="GabrielRS"
WORKDIR /application
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3001
ENV PORT=3001
ENTRYPOINT ["npm", "start"]