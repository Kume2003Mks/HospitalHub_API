# Use the official Node.js 18 image as a base
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the NestJS application
RUN npm run build

# Use a lighter image for the final stage
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy the build from the previous stage
COPY --from=build /app ./

# Expose port 3001
EXPOSE 3001

# Start the NestJS application
CMD ["node", "dist/main"]