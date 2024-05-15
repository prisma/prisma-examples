import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";
import { withPulse } from "@prisma/extension-pulse";
import { Resend } from "resend";

process.on("SIGINT", () => {
  console.log("Received SIGINT signal. Exiting gracefully...");
  process.exit(0);
});

type UserEmail = {
  email: string;
  name: string;
};

// Load environment variables from .env file
config();

// Retrieve API keys from environment variables or provide default values
const PULSE_API_KEY = process.env.PULSE_API_KEY ?? "";
const RESEND_API_KEY = process.env.RESEND_API ?? "";

// Initialize Prisma client with Pulse extension
const prisma = new PrismaClient().$extends(
  withPulse({ apiKey: PULSE_API_KEY })
);

// Initialize Resend client
const resendClient = new Resend(RESEND_API_KEY);

// Function to send user creation email
const sendUserCreationEmail = async ({ email, name }: UserEmail) => {
  const text = `Welcome aboard ${name}!👋`;

  const emailOptions = {
    subject: `User info stored in the database`,
    to: email,
    from: "hello@resend.dev",
    text: text,
  };

  return await resendClient.sendEmail(emailOptions);
};

// Subscribe to user creation events and send emails
const emailSubscriber = async () => {
  const subscription = await prisma.user.subscribe({
    create: {},
  });

  process.on("exit", (code) => {
    console.log("Closing Prisma Pulse Subscription.");
    subscription.stop();
  });

  if (subscription instanceof Error) {
    throw subscription;
  }

  for await (const event of subscription) {
    console.log("Received event:", event);
    const { email, name } = event.created;

    try {
      await sendUserCreationEmail({ email, name });
      console.log("Email sent!");
    } catch (error) {
      console.error("Email sending error:", error);
    }
  }
};

// Main function
async function main() {
  await emailSubscriber();
}

// Run the main function
main();
