# Build stage
FROM public.ecr.aws/lambda/nodejs:20 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build TypeScript files (make sure you have a "build" script in package.json)
RUN npm run build

# Remove dev dependencies
RUN npm prune --production

# Production stage
FROM public.ecr.aws/lambda/nodejs:20

# Set the working directory to AWS Lambda's task root
WORKDIR /var/task

# Copy the built files and dependencies from the build stage
COPY --from=build /app/dist ./
COPY --from=build /app/node_modules ./node_modules

# Ensure AWS Lambda can find the handler
CMD ["index.handler"]
