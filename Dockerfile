ARG NODE_VERSION=14.18.1-alpine

# builder
FROM node:${NODE_VERSION} as builder

RUN apk add --no-cache bash curl

WORKDIR /usr/src/app
COPY . .
RUN yarn install
RUN yarn build

# remove development dependencies
RUN npm prune --production

# install node-prune (https://github.com/tj/node-prune)
RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin
RUN /usr/local/bin/node-prune

# Final
FROM node:14.18.1-alpine as runner

ARG USER=app
ENV APP_HOME=/usr/src/app
WORKDIR $APP_HOME

COPY package.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/index.js ./index.js
COPY --from=builder /usr/src/app/ormconfig.js ./ormconfig.js
COPY --from=builder /usr/src/app/swagger.json ./swagger.json

RUN addgroup -S $USER
RUN adduser -S -H -D $USER $USER
RUN chown -R $USER:$USER $APP_HOME

USER $USER

EXPOSE 3000

CMD ["yarn", "start"]
