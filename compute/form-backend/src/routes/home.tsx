import { Hono } from "hono";

import { publicOrigin } from "../origin.ts";
import { exampleForm } from "../prisma/forms.ts";
import { Layout } from "../ui.tsx";

export const home = new Hono();

home.get("/", async (c) => {
  const origin = publicOrigin(c);
  const form = await exampleForm().catch(() => null);
  const slug = form?.slug ?? "contact";
  const endpoint = `${origin}/f/${slug}`;

  const htmlExample = `<form action="${endpoint}" method="POST">
  <label>Name <input type="text" name="name" required></label>
  <label>Email <input type="email" name="email" required></label>
  <label>Message <textarea name="message" required></textarea></label>

  <!-- Honeypot: humans never see it, bots fill it in. -->
  <input type="text" name="_gotcha" tabindex="-1" autocomplete="off"
         style="position:absolute;left:-9999px" aria-hidden="true">

  <button type="submit">Send</button>
</form>`;

  const fetchExample = `await fetch(${JSON.stringify(endpoint)}, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name, email, message }),
});
// -> { "ok": true }`;

  return c.html(
    <Layout title="Form Backend">
      <header class="site">
        <h1>Form Backend</h1>
        <nav>
          <a href="/admin">Dashboard</a>
        </nav>
      </header>

      <p>
        This server collects HTML form submissions. Point any static site's{" "}
        <code>&lt;form action&gt;</code> at an endpoint below and the submission lands in this
        deployment's database — no JavaScript required, no third-party service involved.
      </p>

      <div class="panel">
        <h2 style="margin-top:0">Endpoint</h2>
        <p>
          <code>POST {endpoint}</code>
        </p>
        <p class="small muted">
          Accepts <code>application/json</code>, <code>application/x-www-form-urlencoded</code>, and{" "}
          <code>multipart/form-data</code> (text fields only). CORS is open on <code>/f/*</code>, so
          browser <code>fetch()</code> from any origin works.
        </p>
      </div>

      <h2>Plain HTML</h2>
      <p class="small muted">
        Posts redirect to the form's configured redirect URL, or to a built-in thank-you page.
      </p>
      <pre>
        <code>{htmlExample}</code>
      </pre>

      <h2>fetch()</h2>
      <p class="small muted">
        A JSON request gets a JSON answer, so you can keep the visitor on the page.
      </p>
      <pre>
        <code>{fetchExample}</code>
      </pre>

      <h2>Good to know</h2>
      <ul class="small">
        <li>
          Any field whose name starts with <code>_</code> is treated as a control field and is never
          stored. <code>_gotcha</code> is the honeypot: fill it in and the request looks successful
          but nothing is saved.
        </li>
        <li>Submissions are capped at 50&nbsp;KB.</li>
        <li>
          No IP address or user agent is recorded — only the submitted fields and the{" "}
          <code>Referer</code> header.
        </li>
        <li>
          Submissions are browsable and exportable as CSV from the <a href="/admin">dashboard</a>.
        </li>
      </ul>

      <footer class="site">
        Self-hosted with Prisma Composer. Source:{" "}
        <code>create-prisma</code> template <code>form-backend</code>.
      </footer>
    </Layout>,
  );
});
