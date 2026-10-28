// What this template is and how it works, below the booking board. Delete this
// file and its use in page.tsx when the app is yours.

export const SOURCE_URL = "https://github.com/prisma/prisma-examples/tree/latest/compute/room-booking-prisma-template";
export const DEPLOY_URL = "https://console.prisma.io/apps/room-booking-prisma-template";

const steps = [
  {
    where: "In your browser",
    what: "The timeline runs the same rules as the server, so a taken slot or a time that has passed turns red before you let go.",
    code: "bookingRules()",
  },
  {
    where: "On the server",
    what: "A Prisma ORM transaction locks the room, reads its bookings again and checks the same rules. Two requests for one room take turns, and the second one is told what is in the way.",
    code: "Room.where({ id }).forNoKeyUpdate()",
  },
  {
    where: "In Postgres",
    what: "An exclusion constraint refuses two bookings of one room that overlap, even from a write that skips the app.",
    code: "EXCLUDE USING gist",
  },
];

const stack = [
  {
    name: "Prisma ORM 8",
    what: "Typed queries and migrations from one schema contract. Every booking change runs in a transaction.",
    href: "https://www.prisma.io/orm",
  },
  {
    name: "Prisma Postgres",
    what: "Stores the rooms and bookings. Every deploy, preview and laptop gets a database of its own.",
    href: "https://www.prisma.io/postgres",
  },
  {
    name: "Prisma Compute",
    what: "Runs the Next.js server. module.ts declares the app and its database, and a deploy provisions both.",
    href: "https://www.prisma.io/compute",
  },
  {
    name: "Resource Scheduler",
    what: "The timeline: drag to book, move and resize.",
    href: "https://www.npmjs.com/package/resource-scheduler",
  },
];

export function About({ rooms, bookings, queryMs }: { rooms: number; bookings: number; queryMs: number }) {
  return (
    <>
      <section className="how" id="how" aria-labelledby="how-heading">
        <h2 id="how-heading">Why a room can never be booked twice</h2>
        <p className="lede">
          Every booking passes three checks on its way in. The last two hold when two people click the same slot at the
          same moment.
        </p>
        <ol className="steps">
          {steps.map((step) => (
            <li key={step.where}>
              <h3>{step.where}</h3>
              <p>{step.what}</p>
              <code>{step.code}</code>
            </li>
          ))}
        </ol>
        <p className="proof">The tests send 25 bookings for the same slot at once. Exactly one gets through.</p>
      </section>

      <section className="stack" aria-labelledby="stack-heading">
        <div className="stack-intro">
          <h2 id="stack-heading">Built on Prisma, end to end</h2>
          <p className="live">
            This page read {rooms} rooms and {bookings} bookings from Prisma Postgres in <strong>{queryMs} ms</strong>.
          </p>
          <div className="actions">
            <a className="button primary" href={DEPLOY_URL}>
              Deploy your own
            </a>
            <a className="button" href={SOURCE_URL}>
              View source
            </a>
          </div>
          <p className="agent-note">
            Setting it up with a coding agent? Point it at <code>AGENTS.md</code>: it covers setup, schema changes and
            deploys.
          </p>
        </div>
        <dl className="stack-list">
          {stack.map((item) => (
            <div key={item.name}>
              <dt>
                <a href={item.href}>{item.name}</a>
              </dt>
              <dd>{item.what}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
