import { Hono } from "hono";
import { createMiddleware } from "hono/factory";

import { adminEnabled, endSession, isSignedIn, passwordMatches, startSession } from "../auth.ts";
import { toCsv } from "../csv.ts";
import { publicOrigin } from "../origin.ts";
import { decodeSubmissionData } from "../payload.ts";
import {
  allSubmissions,
  countSubmissions,
  createForm,
  deleteForm,
  deleteSubmission,
  findFormById,
  listForms,
  listSubmissions,
  setFormActive,
  uniqueSlug,
} from "../prisma/forms.ts";
import { AdminHeader, Layout, formatDate } from "../ui.tsx";

const PAGE_SIZE = 25;

export const admin = new Hono();

/** Read one text field out of a posted form body. */
function field(body: Record<string, unknown>, key: string): string {
  const value = body[key];
  return typeof value === "string" ? value.trim() : "";
}

function parseId(raw: string | undefined): number | null {
  const id = Number(raw);
  return Number.isInteger(id) && id > 0 ? id : null;
}

const requireSession = createMiddleware(async (c, next) => {
  if (!isSignedIn(c)) return c.redirect("/admin", 303);
  await next();
});

admin.use("/forms", requireSession);
admin.use("/forms/*", requireSession);

/* ------------------------------------------------------------------ auth */

function LoginPage({ error }: { error?: string }) {
  const enabled = adminEnabled();
  return (
    <Layout title="Sign in — Form Backend" narrow>
      <header class="site">
        <h1>Form Backend</h1>
        <nav>
          <a href="/">Public page</a>
        </nav>
      </header>

      {enabled ? (
        <div class="panel">
          <form method="post" action="/admin/login">
            <label for="password">Admin password</label>
            <input id="password" type="password" name="password" autofocus required />
            {error ? <p class="error">{error}</p> : null}
            <p>
              <button type="submit" class="primary">
                Sign in
              </button>
            </p>
          </form>
        </div>
      ) : (
        <div class="panel">
          <h2 style="margin-top:0">Dashboard disabled</h2>
          <p class="small">
            No admin password is configured, so there is nothing to sign in to. Set{" "}
            <code>ADMIN_PASSWORD</code> in the environment this server runs in and restart:
          </p>
          <pre>
            <code>ADMIN_PASSWORD=your-password bun run dev:composer</code>
          </pre>
          <p class="small muted">
            The collection endpoint at <code>/f/:slug</code> keeps working either way — only the
            dashboard is gated.
          </p>
        </div>
      )}
    </Layout>
  );
}

admin.get("/", (c) => {
  if (isSignedIn(c)) return c.redirect("/admin/forms", 303);
  return c.html(<LoginPage />);
});

admin.post("/login", async (c) => {
  const body = await c.req.parseBody();
  const password = field(body as Record<string, unknown>, "password");

  if (!adminEnabled()) return c.html(<LoginPage />, 403);
  if (!passwordMatches(password)) {
    return c.html(<LoginPage error="Wrong password." />, 401);
  }

  startSession(c);
  return c.redirect("/admin/forms", 303);
});

admin.post("/logout", (c) => {
  endSession(c);
  return c.redirect("/admin", 303);
});

/* ----------------------------------------------------------------- forms */

admin.get("/forms", async (c) => {
  const forms = await listForms();
  const origin = publicOrigin(c);
  const notice = c.req.query("notice");

  return c.html(
    <Layout title="Forms — Form Backend">
      <AdminHeader />

      {notice ? <p class="badge on">{notice}</p> : null}

      <h2 style="margin-top:0">Forms</h2>
      {forms.length === 0 ? (
        <p class="muted">No forms yet. Create one below.</p>
      ) : (
        <div class="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Endpoint</th>
                <th>Submissions</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {forms.map((form) => (
                <tr>
                  <td>
                    <a href={`/admin/forms/${form.id}`}>{form.name}</a>
                    {form.redirectUrl ? (
                      <div class="small muted">→ {form.redirectUrl}</div>
                    ) : null}
                  </td>
                  <td>
                    <code>
                      {origin}/f/{form.slug}
                    </code>
                  </td>
                  <td>{form.submissionCount}</td>
                  <td>
                    <span class={form.active ? "badge on" : "badge"}>
                      {form.active ? "active" : "paused"}
                    </span>
                  </td>
                  <td>
                    <div class="row">
                      <form method="post" action={`/admin/forms/${form.id}/toggle`} class="inline">
                        <button type="submit" class="link">
                          {form.active ? "Pause" : "Activate"}
                        </button>
                      </form>
                      <form
                        method="post"
                        action={`/admin/forms/${form.id}/delete`}
                        class="inline"
                        onsubmit={`return confirm('Delete "${form.name}" and its ${form.submissionCount} submission(s)? This cannot be undone.')`}
                      >
                        <button type="submit" class="link danger">
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <h2>New form</h2>
      <div class="panel">
        <form method="post" action="/admin/forms">
          <label for="name">Name</label>
          <input id="name" type="text" name="name" placeholder="Newsletter signup" required />
          <label for="redirectUrl">Redirect URL after submit (optional)</label>
          <input
            id="redirectUrl"
            type="url"
            name="redirectUrl"
            placeholder="https://example.com/thanks"
          />
          <p class="small muted">
            Leave the redirect empty to show the built-in thank-you page. The slug is derived from
            the name.
          </p>
          <p>
            <button type="submit" class="primary">
              Create form
            </button>
          </p>
        </form>
      </div>
    </Layout>,
  );
});

admin.post("/forms", async (c) => {
  const body = (await c.req.parseBody()) as Record<string, unknown>;
  const name = field(body, "name");
  const redirectRaw = field(body, "redirectUrl");

  if (name.length === 0) {
    return c.redirect("/admin/forms?notice=A+name+is+required.", 303);
  }

  let redirectUrl: string | null = null;
  if (redirectRaw.length > 0) {
    try {
      const parsed = new URL(redirectRaw);
      if (parsed.protocol !== "http:" && parsed.protocol !== "https:") throw new Error("scheme");
      redirectUrl = parsed.toString();
    } catch {
      return c.redirect("/admin/forms?notice=Redirect+URL+must+be+http+or+https.", 303);
    }
  }

  const slug = await uniqueSlug(name);
  const form = await createForm({ name: name.slice(0, 120), slug, redirectUrl });
  return c.redirect(`/admin/forms/${form.id}`, 303);
});

admin.post("/forms/:id/toggle", async (c) => {
  const id = parseId(c.req.param("id"));
  if (id === null) return c.notFound();

  const form = await findFormById(id);
  if (!form) return c.notFound();

  await setFormActive(id, !form.active);
  return c.redirect("/admin/forms", 303);
});

admin.post("/forms/:id/delete", async (c) => {
  const id = parseId(c.req.param("id"));
  if (id === null) return c.notFound();

  await deleteForm(id);
  return c.redirect("/admin/forms?notice=Form+deleted.", 303);
});

/* ----------------------------------------------------- one form's inbox */

admin.get("/forms/:id", async (c) => {
  const id = parseId(c.req.param("id"));
  if (id === null) return c.notFound();

  const form = await findFormById(id);
  if (!form) return c.notFound();

  const total = await countSubmissions(id);
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const requested = Number(c.req.query("page") ?? "1");
  const page = Number.isInteger(requested) ? Math.min(Math.max(requested, 1), pages) : 1;

  const submissions = await listSubmissions(id, {
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  });
  const origin = publicOrigin(c);

  return c.html(
    <Layout title={`${form.name} — Form Backend`}>
      <AdminHeader />

      <p class="small">
        <a href="/admin/forms">← All forms</a>
      </p>

      <h2 style="margin-top:0">
        {form.name} <span class={form.active ? "badge on" : "badge"}>{form.active ? "active" : "paused"}</span>
      </h2>
      <p class="small muted">
        <code>
          POST {origin}/f/{form.slug}
        </code>
        {" · "}
        {total} submission{total === 1 ? "" : "s"}
        {" · "}
        <a href={`/admin/forms/${form.id}/export.csv`}>Export CSV</a>
      </p>

      {submissions.length === 0 ? (
        <div class="panel">
          <p class="muted" style="margin:0">
            Nothing yet. Post something to the endpoint above and it shows up here.
          </p>
        </div>
      ) : (
        <div class="table-scroll">
          <table>
            <thead>
              <tr>
                <th style="width:14rem">Received</th>
                <th>Fields</th>
                <th style="width:5rem" />
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission) => (
                <tr>
                  <td>
                    <div>{formatDate(submission.createdAt)}</div>
                    {submission.referrer ? (
                      <div class="small muted" style="word-break:break-all">
                        from {submission.referrer}
                      </div>
                    ) : null}
                  </td>
                  <td>
                    <dl class="kv">
                      {decodeSubmissionData(submission.data).map(([key, value]) => (
                        <>
                          <dt>{key}</dt>
                          <dd>{value}</dd>
                        </>
                      ))}
                    </dl>
                  </td>
                  <td>
                    <form
                      method="post"
                      action={`/admin/forms/${form.id}/submissions/${submission.id}/delete`}
                      onsubmit="return confirm('Delete this submission?')"
                    >
                      <button type="submit" class="link danger">
                        Delete
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {pages > 1 ? (
        <div class="pager">
          {page > 1 ? <a href={`/admin/forms/${form.id}?page=${page - 1}`}>← Newer</a> : null}
          <span class="muted">
            Page {page} of {pages}
          </span>
          {page < pages ? <a href={`/admin/forms/${form.id}?page=${page + 1}`}>Older →</a> : null}
        </div>
      ) : null}
    </Layout>,
  );
});

admin.post("/forms/:id/submissions/:submissionId/delete", async (c) => {
  const id = parseId(c.req.param("id"));
  const submissionId = parseId(c.req.param("submissionId"));
  if (id === null || submissionId === null) return c.notFound();

  await deleteSubmission(id, submissionId);
  return c.redirect(`/admin/forms/${id}`, 303);
});

/* ------------------------------------------------------------ csv export */

admin.get("/forms/:id/export.csv", async (c) => {
  const id = parseId(c.req.param("id"));
  if (id === null) return c.notFound();

  const form = await findFormById(id);
  if (!form) return c.notFound();

  const submissions = await allSubmissions(id);

  // Columns are the union of every key seen, in first-seen order.
  const columns: string[] = [];
  const decoded = submissions.map((submission) => {
    const pairs = decodeSubmissionData(submission.data);
    const record: Record<string, string> = {};
    for (const [key, value] of pairs) {
      if (!columns.includes(key)) columns.push(key);
      record[key] = value;
    }
    return { record, createdAt: submission.createdAt };
  });

  const rows: string[][] = [[...columns, "submittedAt"]];
  for (const entry of decoded) {
    rows.push([
      ...columns.map((column) => entry.record[column] ?? ""),
      entry.createdAt.toISOString(),
    ]);
  }

  return c.body(toCsv(rows), 200, {
    "Content-Type": "text/csv; charset=utf-8",
    "Content-Disposition": `attachment; filename="${form.slug}-submissions.csv"`,
    "Cache-Control": "no-store",
  });
});
