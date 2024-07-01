# Stage 1: Build the React application
FROM node:18.15.0-alpine AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install the dependencies
RUN npm install

# Install TypeScript globally (if not already installed in the Node.js image)
RUN npm install -g typescript

# Install Vite globally
RUN npm install -g vite

# Copy the source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the React application
FROM nginx:alpine

# Copy the build files to the Nginx server
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]