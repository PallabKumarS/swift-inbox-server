# 1. Use official Node.js image with Alpine Linux (small, efficient)
FROM node:22-alpine

# 2. Set working directory inside the container
WORKDIR /app

# 3. Copy package.json and package-lock.json (or yarn.lock) first
# This lets Docker cache npm install layer separately for faster rebuilds
COPY package*.json ./
COPY prisma ./prisma
COPY tsconfig.json ./

# 4. Install dependencies (production only for smaller image)
RUN npm install
RUN npx prisma generate

# 5. Copy all source code into the container
COPY ... ./

# 6. Build your TypeScript code to JavaScript (outputs to /dist)
RUN npm run build

# 7. Expose port (the port your app will listen on)
EXPOSE 5000

# 8. Run the compiled app when container starts
CMD ["node", "dist/index.js"]

