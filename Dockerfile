# Use the official Node.js 18 image as the base image
FROM node:18.14.0

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port that your application is listening on (if it's not 3000, change it accordingly)
EXPOSE 3000

# Start your Node.js application
CMD ["npm", "run", "start"]
