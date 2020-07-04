FROM node:12 as builder
WORKDIR /usr/src/app
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install
COPY . .
RUN yarn run build

FROM node:12
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/ /usr/src/app/
RUN npm prune --production
EXPOSE 3000
CMD npm start