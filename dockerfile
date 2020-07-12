FROM node:latest

#Create the directory ! 
RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

# Copy nad Install our bot
COPY package.json /usr/src/bot
RUN yarn install

#our bot
COPY . /usr/src/bot

#start
CMD ["node", "index.js"]

