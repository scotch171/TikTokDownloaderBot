# Use the official Node.js image as the base image
FROM node:19

# Set the working directory in the container
WORKDIR /app

# Copy the application files into the working directory
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .


# Define the entry point for the container
CMD ["npm", "start"]