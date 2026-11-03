import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";

import "./globals.css";

// One calm, geometric family for everything; tabular figures line the times up.
const sans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });

const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export const metadata: Metadata = {
  title: "Rooms: meeting room booking on Prisma",
  description:
    "Book meeting rooms on a timeline, and never book the same room twice. A Next.js template on Prisma ORM, Prisma Postgres and Prisma Compute.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e3eaf7" },
    { media: "(prefers-color-scheme: dark)", color: "#090b27" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // data-theme="system": the page and the scheduler follow the OS light or dark
    // setting, until the theme button picks one. The script applies that choice
    // before the first paint, so React is told the attribute may differ.
    <html lang="en" data-theme="system" className={sans.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
