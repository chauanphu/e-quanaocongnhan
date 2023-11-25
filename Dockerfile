# Dockerfile
# Use an official Node.js runtime as the base image
FROM node:20-alpine3.18 as base

# Set the working directory in the Docker image
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the Docker image
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies in the Docker image
RUN npm install
RUN npm install @prisma/client
# Copy the rest of your app's source code to the Docker image
COPY . .

RUN npx prisma generate --schema ./prisma/schema.prisma

# Set NODE_ENV to production
ENV NODE_ENV production

# Build the Next.js application for production
RUN npm run build

# Remove pages, lib, app, components, public, styles, and lib directories
RUN rm -rf pages lib app components styles lib interfaces

# Expose port 3000 for the app
EXPOSE 3000 5555

CMD npm run start & npx prisma studio
