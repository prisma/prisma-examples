import { connectDatabase, db } from "./db.ts";

/**
 * A single demo form plus a few submissions, so a fresh deployment has
 * something to show in the dashboard and in the CSV export.
 *
 * The seed only runs against a completely empty database: once any form
 * exists, it never writes again — so deleting the demo data sticks.
 */
const demoForm = {
  name: "Contact",
  slug: "contact",
  redirectUrl: null,
} as const;

const demoSubmissions = [
  {
    name: "Ada Lovelace",
    email: "ada@example.com",
    message: "Love the project. Any plans for webhook notifications?",
  },
  {
    name: "Grace Hopper",
    email: "grace@example.com",
    message: "Found a typo in the README — happy to send a PR.",
  },
  {
    name: "Alan Turing",
    email: "alan@example.com",
    message: "Does this handle multipart forms? Asking for a friend.",
  },
];

let pendingSeed: Promise<void> | undefined;

async function runSeed(): Promise<void> {
  await connectDatabase();

  const existing = await db.orm.public.Form.first();
  if (existing) return;

  const form = await db.orm.public.Form.upsert({
    create: demoForm,
    update: {},
    conflictOn: { slug: demoForm.slug },
  });

  // Compute can cold-start several instances at once; the upsert above is
  // idempotent, but the demo submissions are not — re-check before inserting.
  const alreadySeeded = await db.orm.public.Submission.first({ formId: form.id });
  if (alreadySeeded) return;

  await db.orm.public.Submission.createAll(
    demoSubmissions.map((payload) => ({
      formId: form.id,
      data: JSON.stringify(payload),
      referrer: "https://example.com/contact",
    })),
  );
}

export function seed(): Promise<void> {
  pendingSeed ??= runSeed().catch((error: unknown) => {
    pendingSeed = undefined;
    throw error;
  });
  return pendingSeed;
}
