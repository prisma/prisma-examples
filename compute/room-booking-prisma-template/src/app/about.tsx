// What this template is built with, in the cards below the timeline, and where
// its source lives. Delete the cards in page.tsx and the source link in
// board.tsx when the app is yours.

export const SOURCE_URL = "https://github.com/prisma/prisma-examples/tree/latest/compute/room-booking-prisma-template";

// The marks belong to their owners. Next.js is from Simple Icons 16.34.0 (CC0),
// drawn in the text color. Prisma is its current mark, from prisma.io/icon.svg,
// in its own colors. Resource Scheduler has no logo, so it gets three bookings
// on a timeline.
const nextLogo = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z"
    />
  </svg>
);

const prismaLogo = (
  <svg viewBox="0 0 263 264" aria-hidden="true">
    <path fill="#04D5E7" d="M57.3357 92.5003L0 149.939V53.5L53.2105 0.10425V0H149.524L57.3357 92.5003Z" />
    <path fill="#FE4352" d="M263 91.7452L91.0537 264H0V172.229L171.92 0H263V91.7452Z" />
    <path fill="#FEBE29" d="M209.686 264H113.373L156.453 220.773L263.001 114.034V210.5L209.686 264Z" />
  </svg>
);

const schedulerLogo = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M4 4h8a2 2 0 0 1 0 4H4a2 2 0 0 1 0-4zM10 10h10a2 2 0 0 1 0 4H10a2 2 0 0 1 0-4zM6 16h6a2 2 0 0 1 0 4H6a2 2 0 0 1 0-4z"
    />
  </svg>
);

export const stack = [
  {
    name: "Next.js 16",
    kind: "Framework",
    what: "App Router. The page reads the rooms and the day's bookings on the server; the timeline runs in the browser.",
    href: "https://nextjs.org",
    logo: nextLogo,
  },
  {
    name: "Prisma ORM 8",
    kind: "ORM",
    what: "Typed queries and migrations from one schema contract. Every booking change runs in a transaction.",
    href: "https://www.prisma.io/orm",
    logo: prismaLogo,
  },
  {
    name: "Prisma Postgres",
    kind: "Database",
    what: "Stores the rooms and bookings. Every deploy, preview and laptop gets a database of its own.",
    href: "https://www.prisma.io/postgres",
    logo: prismaLogo,
  },
  {
    name: "Prisma Compute",
    kind: "Hosting",
    what: "Runs the Next.js server. module.ts declares the app and its database, and a deploy provisions both.",
    href: "https://www.prisma.io/compute",
    logo: prismaLogo,
  },
  {
    name: "Resource Scheduler",
    kind: "Timeline",
    what: "The timeline: drag to book, move and resize, day and week views, utilization, free-slot search and calendar files.",
    href: "https://resource-scheduler-docs.vercel.app",
    logo: schedulerLogo,
  },
];
