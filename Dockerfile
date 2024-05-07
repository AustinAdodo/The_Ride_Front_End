#FROM ubuntu:latest
#LABEL authors="mudia"
#
#ENTRYPOINT ["top", "-b"]
# Node runtime as a parent image
# Node runtime as a parent image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json* ./

# Installing app dependencies
RUN npm install

# Bundle app source
COPY . .

# Build the application for production
RUN npm run build -- --configuration=production

# Install serve to serve your app on container start
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 4200

# Command to run on container start
CMD ["serve", "-s", "build", "-l", "4200"]
