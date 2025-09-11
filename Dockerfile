# Stage 1: Building the code
FROM node:18-alpine AS builder

WORKDIR /app
# ARG NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
# ARG NEXT_PUBLIC_AWS_REGION
# ARG NEXT_PUBLIC_AWS_ACCESS_KEY_ID
# ARG NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY
# ARG NEXT_PUBLIC_S3_BUCKET_NAME
# ARG S3_BUCKET_URL
ARG NEXT_PUBLIC_GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_BACKEND_API
ARG NEXT_PUBLIC_CHAT_API

# ENV NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=$NEXT_PUBLIC_GOOGLE_MAPS_API_KEY 
# ENV NEXT_PUBLIC_AWS_REGION=$NEXT_PUBLIC_AWS_REGION
# ENV NEXT_PUBLIC_AWS_ACCESS_KEY_ID=$NEXT_PUBLIC_AWS_ACCESS_KEY_ID
# ENV NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY=$NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY
# ENV NEXT_PUBLIC_S3_BUCKET_NAME=$NEXT_PUBLIC_S3_BUCKET_NAME
# ENV S3_BUCKET_URL=$S3_BUCKET_URL
ENV NEXT_PUBLIC_GOOGLE_CLIENT_ID=$NEXT_PUBLIC_GOOGLE_CLIENT_ID
ENV GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_BACKEND_API=$NEXT_PUBLIC_BACKEND_API
ENV NEXT_PUBLIC_CHAT_API=$NEXT_PUBLIC_CHAT_API


# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --platform=linux --arch=x64
RUN npm ci


# Copy the rest of the code
COPY . .


# Build the application
RUN npm run build

# Stage 2: Run the built code
FROM node:18-alpine AS runner

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm install --platform=linux --arch=x64
RUN npm ci --only=production

# Copy built application from builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./

# Create a non-root user and switch to it
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Expose the port the app runs on
EXPOSE 3000
ENV PORT 3000

# Start the application
CMD ["npm", "run", "start"]

