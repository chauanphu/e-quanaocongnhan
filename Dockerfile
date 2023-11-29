# Base image
FROM node:20-alpine3.18 AS base

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
# 
RUN npm install
RUN npm install @prisma/client
# Copy the rest of your app's source code to the Docker image
COPY . .

# Set NODE_ENV to production
ENV NODE_ENV production

RUN npx prisma generate --schema ./prisma/schema.prisma

#Build the Next.js application for production
RUN npm run build

#====================================
# Production stage
#====================================
FROM node:20-alpine3.18 AS production

# Set working directory
WORKDIR /app

# Copy built files from base image
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/.next ./.next
COPY --from=base /app/public ./public
COPY --from=base /app/package.json ./package.json 
# Expose port
EXPOSE 3000

CMD npm run start
