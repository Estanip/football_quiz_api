## DEVELOPMENT ##
# Base image
FROM node:18.20.6-alpine as development

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
#RUN npm ci
RUN yarn install

# Bundle app source
COPY . .

## BUILD ##
FROM node:18.20.6-alpine as build

WORKDIR /usr/src/app

COPY --from=development /usr/src/app/node_modules ./node_modules

# Creates a "dist" folder with the production build
RUN yarn run build

ENV NODE_ENV production

RUN yarn --production

## PRODUCTION ##
FROM node:18.20.6-alpine as production

COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

# Expose the port on which the app will run
EXPOSE 3000

# Start the server using the production build
CMD ["yarn", "run", "start:prod"]