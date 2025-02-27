## DEVELOPMENT ##
#FROM node:18.20.6-alpine as development

#WORKDIR /usr/src/app

#COPY package.json yarn.lock ./

#RUN yarn

#COPY . .

## BUILD ##
#FROM node:18.20.6-alpine as build

#WORKDIR /usr/src/app

#COPY --from=development /usr/src/app/node_modules ./node_modules

#RUN yarn build

#ENV NODE_ENV production

#RUN yarn --production

## PRODUCTION ##
#FROM node:18.20.6-alpine as production

#COPY --from=build /usr/src/app/node_modules ./node_modules
#COPY --from=build /usr/src/app/dist ./dist

#CMD [ "node", "dist/main.js" ]

# Base image
FROM node:20

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm ci

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

# Expose the port on which the app will run
EXPOSE 3000

# Start the server using the production build
CMD ["npm", "run", "start:prod"]