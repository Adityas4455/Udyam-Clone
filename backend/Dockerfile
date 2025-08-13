FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .

# Build TypeScript -> JS (dist/) if you choose to use `npm run start`
# RUN npm run build

# default dev command (override in production)
CMD [ "npm", "run", "dev" ]
