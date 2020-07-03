FROM node:12.18-alpine
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY ["package.json", "yarn-lock.json*", "./"]
RUN yarn install --production --silent && mv node_modules ../
COPY . .
EXPOSE 3000
CMD npm start