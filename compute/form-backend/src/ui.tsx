import type { Child, FC } from "hono/jsx";

/** One small embedded stylesheet — no framework, no build step, both themes. */
export const styles = `
:root {
  color-scheme: light dark;
  --bg: #fbfbfd;
  --panel: #ffffff;
  --border: #e3e3ea;
  --text: #16161d;
  --muted: #6a6a78;
  --accent: #3b5bdb;
  --accent-contrast: #ffffff;
  --danger: #c92a2a;
  --ok-bg: #e6f7ed;
  --ok-text: #12734a;
  --code-bg: #f2f2f7;
  --radius: 10px;
}
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #0f1014;
    --panel: #17181e;
    --border: #2a2c36;
    --text: #eceef4;
    --muted: #9a9daa;
    --accent: #7c93f5;
    --accent-contrast: #0f1014;
    --danger: #ff8787;
    --ok-bg: #14311f;
    --ok-text: #7ee2a8;
    --code-bg: #1e202a;
  }
}
* { box-sizing: border-box; }
body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font: 15px/1.6 ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
}
.wrap { max-width: 900px; margin: 0 auto; padding: 2.5rem 1.25rem 4rem; }
.wrap.narrow { max-width: 460px; }
header.site { display: flex; flex-wrap: wrap; gap: 1rem; align-items: baseline; justify-content: space-between; margin-bottom: 2rem; }
header.site h1 { font-size: 1.35rem; margin: 0; letter-spacing: -0.01em; }
header.site nav { display: flex; gap: 1rem; align-items: center; font-size: 0.9rem; }
h2 { font-size: 1.1rem; margin: 2rem 0 0.75rem; }
h3 { font-size: 0.95rem; margin: 1.5rem 0 0.5rem; }
p { margin: 0.6rem 0; }
a { color: var(--accent); }
.muted { color: var(--muted); }
.small { font-size: 0.85rem; }
.panel {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.25rem;
  margin: 1rem 0;
}
pre {
  background: var(--code-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 0.9rem 1rem;
  overflow-x: auto;
  font: 13px/1.55 ui-monospace, SFMono-Regular, Menlo, monospace;
  margin: 0.75rem 0;
}
code { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 0.9em; }
table { width: 100%; border-collapse: collapse; font-size: 0.92rem; }
th, td { text-align: left; padding: 0.6rem 0.5rem; border-bottom: 1px solid var(--border); vertical-align: top; }
th { font-weight: 600; color: var(--muted); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.04em; }
.table-scroll { overflow-x: auto; }
label { display: block; font-size: 0.85rem; font-weight: 600; margin: 0.85rem 0 0.3rem; }
input[type="text"], input[type="password"], input[type="url"] {
  width: 100%;
  padding: 0.55rem 0.7rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--bg);
  color: var(--text);
  font: inherit;
}
button {
  font: inherit;
  padding: 0.5rem 0.9rem;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--panel);
  color: var(--text);
  cursor: pointer;
}
button:hover { border-color: var(--accent); }
button.primary { background: var(--accent); border-color: var(--accent); color: var(--accent-contrast); font-weight: 600; }
button.link { background: none; border: none; padding: 0.15rem 0; color: var(--accent); text-decoration: underline; }
button.link.danger { color: var(--danger); }
.row { display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap; }
.inline { display: inline; }
.badge { display: inline-block; font-size: 0.72rem; font-weight: 600; padding: 0.1rem 0.45rem; border-radius: 999px; border: 1px solid var(--border); color: var(--muted); }
.badge.on { background: var(--ok-bg); color: var(--ok-text); border-color: transparent; }
.error { color: var(--danger); font-size: 0.9rem; margin: 0.6rem 0; }
.kv { margin: 0; display: grid; grid-template-columns: minmax(90px, max-content) 1fr; gap: 0.15rem 0.75rem; }
.kv dt { color: var(--muted); font-size: 0.8rem; }
.kv dd { margin: 0; word-break: break-word; white-space: pre-wrap; }
.pager { display: flex; gap: 1rem; align-items: center; margin-top: 1.25rem; font-size: 0.9rem; }
footer.site { margin-top: 3rem; border-top: 1px solid var(--border); padding-top: 1rem; font-size: 0.85rem; color: var(--muted); }
`;

export const Layout: FC<{ title: string; narrow?: boolean; children?: Child }> = ({
  title,
  narrow,
  children,
}) => (
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="noindex" />
      <title>{title}</title>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
    </head>
    <body>
      <div class={narrow ? "wrap narrow" : "wrap"}>{children}</div>
    </body>
  </html>
);

export const AdminHeader: FC = () => (
  <header class="site">
    <h1>
      <a href="/admin/forms" style="color:inherit;text-decoration:none">
        Form Backend
      </a>
    </h1>
    <nav>
      <a href="/">Public page</a>
      <form method="post" action="/admin/logout" class="inline">
        <button type="submit" class="link">
          Sign out
        </button>
      </form>
    </nav>
  </header>
);

export function formatDate(value: Date): string {
  return value.toISOString().replace("T", " ").slice(0, 19) + " UTC";
}
