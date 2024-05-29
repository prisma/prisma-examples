# Prisma Pulse Example: Fullstack Simple Chat (Next.js & Express)

![](./simple-chat.gif)

This repository contains an example app that uses Prisma Pulse in a fullstack chat application:

- [Next.js](https://nextjs.org/) as the frontend
- [Express](https://expressjs.com) as the backend
- [socket.io](https://socket.io/) for the websocket connection between client and server
- [Prisma Pulse](https://www.prisma.io/data-platform/pulse) to get real-time updates from the database
- [PostgreSQL](https://www.postgresql.org/) as the database

## Prerequisites

To successfully run the project, you will need the following:

- The **connection string** of a Pulse-ready database (if you don't have one yet, you can configure your database following the instructions in our [docs](https://www.prisma.io/docs/pulse/database-setup) or [use a Railway template](https://railway.app/template/pulse-pg?referralCode=VQ09uv))
- A **Pulse API key** which you can get by enabling Pulse in a project in your [Prisma Data Platform](https://pris.ly/pdp) account (learn more in the [docs](https://www.prisma.io/docs/platform/concepts/environments#api-keys))

## Getting started

### 1. Clone the respository

Clone the repository, navigate into it and install dependencies in the [`client`](./client) and [`server`](./server) directories:

```
git clone git@github.com:prisma/prisma-examples.git --depth=1
cd prisma-examples/pulse/fullstack-simple-chat/client
npm install
cd ../server
npm install
```

### 2. Configure environment variables

Create a `.env` file in the [`./server`](./server) directory:

```bash
# make sure you're inside the `server` directory
touch .env
```

Now, open the `./server/.env` file and update the `DATABASE_URL` and `PULSE_API_KEY` environment variables with the values of your connection string, your Pulse and Resend API keys:

```bash
# ./server/.env
DATABASE_URL="__YOUR_DATABASE_CONNECTION_STRING__"
PULSE_API_KEY="__YOUR_PULSE_API_KEY__"
```

Note that `__YOUR_DATABASE_CONNECTION_STRING__` and `__YOUR_PULSE_API_KEY__` are **placeholder values that you must replace** with the values of your own connection string and Pulse API key.

### 3. Run a database migration to create the `Message` table

The [Prisma schema file](./prisma/schema.prisma) in this project contains a single `Message` model. You can map this model to the database and create the corresponding `Message` table using the following command inside the `server` directory:

```bash
# make sure you're inside the `server` directory
npx prisma migrate dev --name init
```

You now have a table called `Message` in your database.


### 4. Start the server

Make sure you're inside the [`./server`](./server) directory and start the long-running server that streams changes from the database:

```bash
# make sure you're inside the `server` directory
npm run dev
```

The server will accept WebSocket connections at `http://localhost:3001`.

Next, open a new terminal tab/window to run the Next.js app from inside the [`./client`](./client) directory:

```bash
# make sure you're inside the `client` directory
npm run dev
```

You can open the app at [`http://localhost:3000`](http://localhost:3000).

Every new tab/window you open in your browser and point to that URL will instantiate its own WebSocket connection to the long-running server.

### 5. Use the app

Write text into the chat box and send it. If you open multiple tabs/windows, new users will appear who can contribute to the chat as well. The text will appear in all tabs/windows at the same time.

## Deployment


### Deploying on Railway

In the following, you find instructions to deploy the app via [Railway](https://railway.app). In order to deploy successfully, you need:
- a Railway account
- the Railway CLI installed on your machine


#### Deploying the frontend

Create a new

#### Deploying the backend

## Resources

- [Pulse examples](https://pris.ly/pulse-examples)
- [Pulse documentation](https://pris.ly/pulse-docs)
- [Pulse announcement blog post](https://pris.ly/gh/pulse-ga)
- [Prisma Discord](https://pris.ly/discord)
