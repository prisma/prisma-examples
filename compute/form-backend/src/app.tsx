import { Hono } from "hono";

import { admin } from "./routes/admin.tsx";
import { collect } from "./routes/collect.tsx";
import { home } from "./routes/home.tsx";
import { Layout } from "./ui.tsx";

export const app = new Hono();

app.route("/", home);
app.route("/f", collect);
app.route("/admin", admin);

app.get("/healthz", (c) => c.text("ok"));

app.notFound((c) =>
  c.html(
    <Layout title="Not found" narrow>
      <h1>Not found</h1>
      <p class="muted">
        Nothing lives at <code>{new URL(c.req.url).pathname}</code>.{" "}
        <a href="/">Back to the start</a>.
      </p>
    </Layout>,
    404,
  ),
);

app.onError((error, c) => {
  console.error("Request failed:", error);
  return c.html(
    <Layout title="Server error" narrow>
      <h1>Something went wrong</h1>
      <p class="muted">
        The server hit an unexpected error. Check the service logs for details.
      </p>
    </Layout>,
    500,
  );
});
