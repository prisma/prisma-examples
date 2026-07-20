import type { CSSProperties } from "react";

const styles = {
  main: {
    fontFamily: "system-ui, sans-serif",
    maxWidth: "720px",
    margin: "48px auto",
    padding: "0 20px",
    color: "#111",
  },
  code: {
    background: "#f4f4f4",
    padding: "2px 4px",
    borderRadius: "4px",
  },
} satisfies Record<string, CSSProperties>;

export default function Home() {
  return (
    <main style={styles.main}>
      <h1>Next.js on Prisma Compute</h1>
      <p>This app uses Next.js App Router, Prisma ORM, and PostgreSQL.</p>
      <p>
        Query the seeded users at{" "}
        <a href="/api/users">
          <code style={styles.code}>/api/users</code>
        </a>
        .
      </p>
      <p>
        Deploy it with <code style={styles.code}>npm run compute:deploy</code>.
      </p>
    </main>
  );
}
