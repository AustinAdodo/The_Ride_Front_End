#FROM ubuntu:latest
#LABEL authors="mudia"
#
#ENTRYPOINT ["top", "-b"]

# Use a Node.js base image with a newer version
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json* ./

# Installing app dependencies
RUN npm install

# Bundle app source
COPY . .

# Set the NODE_ENV environment variable to 'production'
ARG ANGULAR_ENV
ENV NODE_ENV=$ANGULAR_ENV

# Build the application for production
RUN if [ "$ANGULAR_ENV" = "production" ]; then npm run build -- --configuration=production; else npm run build; fi

# Add a global variable to mock the 'net' package
RUN echo "global.net = require('net');" > src/window-global-fix.ts

# Install serve to serve your app on container start
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 4200

# Command to run on container start
CMD ["serve", "-s", "build", "-l", "4200"]
