# Use an official Node image as the base
FROM node:18-alpine as build

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY visualizer-frontend/package.json visualizer-frontend/yarn.lock ./
RUN yarn install

# Copy the rest of the application code
COPY visualizer-frontend/ ./

# Build the Expo app for web
RUN yarn web --non-interactive

# Serve the build with an Nginx server
FROM nginx:alpine
COPY --from=build /app/web-build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
