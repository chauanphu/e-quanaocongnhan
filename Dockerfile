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

RUN npx prisma generate

#Build the Next.js application for production
RUN npm run build

#====================================
# Production stage
#====================================
FROM node:20-alpine3.18 AS production

# Set working directory
WORKDIR /app

# Copy built files from base image
COPY --from=base /app/.next ./.next
COPY --from=base /app/public ./public
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json 
COPY --from=base /app/next.config.js ./next.config.js
COPY --from=base /app/prisma ./prisma
# Expose port
EXPOSE 3000 5555

# RUN npm run start and npx prisma studio parraelly

CMD npx prisma migrate deploy & npm run start & npx prisma studio
