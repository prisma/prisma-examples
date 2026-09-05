import { Hono } from "hono";
import type { Context } from "hono";
import { cors } from "hono/cors";
import type { ContentfulStatusCode } from "hono/utils/http-status";

import { parseSubmissionBody } from "../payload.ts";
import { createSubmission, findFormBySlug } from "../prisma/forms.ts";
import { Layout } from "../ui.tsx";

/**
 * The public collection endpoint. Mounted at `/f`, and the only part of the
 * app with permissive CORS — anyone's static site may post here.
 */
export const collect = new Hono();

collect.use(
  "/*",
  cors({
    origin: "*",
    allowMethods: ["POST", "OPTIONS"],
    allowHeaders: ["Content-Type", "Accept"],
    maxAge: 86400,
  }),
);

function fail(c: Context, status: ContentfulStatusCode, message: string, wantsJson: boolean) {
  if (wantsJson) {
    return c.json({ ok: false, error: message }, status);
  }
  return c.html(
    <Layout title="Submission failed" narrow>
      <h1>Submission failed</h1>
      <p class="muted">{message}</p>
    </Layout>,
    status,
  );
}

collect.post("/:slug", async (c) => {
  const slug = c.req.param("slug");

  const parsed = await parseSubmissionBody(c);
  const wantsJson = parsed.wantsJson;

  const form = await findFormBySlug(slug);
  if (!form) {
    return fail(c, 404, `No form named "${slug}" exists on this server.`, wantsJson);
  }
  if (!form.active) {
    return fail(c, 410, `The form "${slug}" is no longer accepting submissions.`, wantsJson);
  }

  if (!parsed.ok) {
    return fail(c, parsed.status, parsed.message, wantsJson);
  }

  // Honeypot: answer exactly like a success, but store nothing.
  if (!parsed.honeypot) {
    await createSubmission({
      formId: form.id,
      data: JSON.stringify(parsed.payload),
      referrer: c.req.header("referer") ?? c.req.header("referrer") ?? null,
    });
  }

  if (wantsJson) {
    return c.json({ ok: true });
  }
  if (form.redirectUrl) {
    return c.redirect(form.redirectUrl, 303);
  }
  return c.html(
    <Layout title="Thanks" narrow>
      <h1>Thanks — submission received</h1>
      <p class="muted">Your message was delivered to “{form.name}”. You can close this tab.</p>
    </Layout>,
  );
});
