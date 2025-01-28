## DEVELOPMENT ##
FROM node:18.20.6-alpine as development

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

## BUILD ##
FROM node:18.20.6-alpine as build

WORKDIR /usr/src/app

COPY --from=development /usr/src/app/node_modules ./node_modules

RUN yarn build

ENV NODE_ENV production

RUN yarn --production

## PRODUCTION ##
FROM node:18.20.6-alpine as production

COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

CMD [ "node", "dist/main.js" ]