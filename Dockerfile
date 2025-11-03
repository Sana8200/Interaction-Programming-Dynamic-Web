# Use Node.js 22 LTS version (required by Vite)
FROM node:22

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./


# Install dependencies
RUN npm install && npm update @iprog/test

# Copy project files
COPY . .

# Expose the port that Vite uses
EXPOSE 8080

# Start the development server with host binding for Docker
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
