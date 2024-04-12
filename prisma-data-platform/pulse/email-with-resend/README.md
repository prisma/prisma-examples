# Prisma Pulse and Resend Integration Example

This repository contains an example Node.js application that demonstrates how to integrate Prisma with the Pulse extension and Resend for sending emails upon user creation events.

---

## Prerequisite

1. Setup a Pulse compatible PostgreSQL database. Read the requirements for Pulse [here](https://www.prisma.io/docs/data-platform/pulse/getting-started#1-database-setup). To easily get started, you can watch the Pulse setup with Railway video below.
   [![Watch the video](https://img.youtube.com/vi/DrTnowASuqo/0.jpg)](https://www.youtube.com/watch?v=DrTnowASuqo)
2. Visit [Prisma Data Platform](https://pris.ly/pdp) and enable Pulse
3. Resend API key. Create an account [here](https://resend.com/).

## Getting Started

To get started, follow these steps:

1. Clone the repo into your local machine.
2. Install dependencies

   ```bash
   pnpm install
   ```

3. Create a .env file in the root directory and provide your Database URL, Pulse and Resend API keys:

   ```bash
   DATABASE_URL=""
   PULSE_API_KEY=""
   RESEND_API_KEY=""
   ```

## Running the Application

1. Start the script

   ```bash
   pnpm run dev
   ```

2. Add a new user record with a valid email to the `User` table in the database using Prisma Studio or any other database tool

   ```bash
   pnpm prisma studio
   ```

   ![Insert image](./images/insert.png)

3. Check the inserted email account and you should receive an email
   ![image.png](./images/email.png)

## Conclusion

This example demonstrates how to integrate Prisma with the Pulse extension and Resend to send emails upon user creation events.
