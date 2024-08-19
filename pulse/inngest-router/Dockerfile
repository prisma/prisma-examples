FROM node:20-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npx prisma generate
RUN npm run build
ENV DATABASE_URL="" \
  PULSE_API_KEY="" \
  NODE_ENV="production"

CMD ["node", "dist/index.js"]
