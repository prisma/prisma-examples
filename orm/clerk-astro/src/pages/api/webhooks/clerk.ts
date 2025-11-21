import { verifyWebhook } from "@clerk/astro/webhooks";
import type { APIRoute } from "astro";
import prisma from "../../../lib/prisma";

export const POST: APIRoute = async ({ request }) => {
  try {
    const evt = await verifyWebhook(request, {
      signingSecret: import.meta.env.CLERK_WEBHOOK_SIGNING_SECRET,
    });
    const { id } = evt.data;
    const eventType = evt.type;
    console.log(
      `Received webhook with ID ${id} and event type of ${eventType}`,
    );

    if (eventType === "user.created") {
      const { id, email_addresses, first_name, last_name } = evt.data;
      await prisma.user.upsert({
        where: { clerkId: id },
        update: {},
        create: {
          clerkId: id,
          email: email_addresses[0].email_address,
          name: `${first_name} ${last_name}`,
        },
      });
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
};
