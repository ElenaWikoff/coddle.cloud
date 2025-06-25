# Use the Long Term Support Node.js Alpine image as base image
FROM node:lts-alpine

# Set container's working directory
WORKDIR /app

# Copy package files (to optimize layer caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of application
COPY . .

# Expose to port used in vite.congfig.js
EXPOSE 5001

# Run the React development server in container
CMD ["npm", "run", "dev", "--", "--host"]