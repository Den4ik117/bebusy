FROM node:18.10.0-alpine
# Create app directory
#RUN #mkdir -p /usr/src/app/node_modules && chown -R node:node /usr/src/app

WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

#USER node

#COPY . .
RUN npm install

COPY . .

RUN npm run build && vite build

#COPY --chown=node:node . .
# If you are building your code for production
# RUN npm ci --omit=dev
# Bundle app source
EXPOSE 5000

CMD [ "node", "dist/index.js" ]
