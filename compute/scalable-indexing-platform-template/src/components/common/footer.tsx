import Link from "next/link";
import { Badge } from "@/components/ui/badge";

function GithubIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function FacebookIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
      />
    </svg>
  );
}

function LinkedinIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="w-full border-t border-border/70 bg-card/40 mt-auto transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        {/* 3-Column Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-border/60">
          {/* Column 1: DevShelf Logo, Mission Statement, and Database Status Indicator */}
          <div className="md:col-span-5 flex flex-col items-start gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-md"
              aria-label="DevShelf Indexer"
            >
              <div className="flex items-center justify-center size-7 rounded-md bg-foreground text-background font-mono font-bold text-xs">
                D/S
              </div>
              <span className="font-heading text-lg font-bold tracking-tight text-foreground">
                DevShelf
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-sm">
              DevShelf indexes open-source developer tutorials, project templates, and architecture blueprints. Built for engineers who learn through code.
            </p>

            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md border border-border bg-muted/30 text-xs">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-muted-foreground text-[11px]">
                ⚡ 1,000,000+ Records Indexed
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3 flex flex-col gap-2.5">
            <h3 className="text-xs font-semibold tracking-wide text-foreground">
              Navigation
            </h3>
            <ul className="space-y-1.5 text-xs text-muted-foreground">
              <li>
                <Link href="/#catalog" className="hover:text-foreground transition-colors">
                  Explore Catalog
                </Link>
              </li>
              <li>
                <Link href="/#catalog" className="hover:text-foreground transition-colors">
                  Fast API Reference
                </Link>
              </li>
              <li>
                <Link href="/#docs" className="hover:text-foreground transition-colors">
                  Full-Text Search Docs
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/anas20023"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  Submit Repository
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Built With Stack Badges */}
          <div className="md:col-span-4 flex flex-col gap-2.5">
            <h3 className="text-xs font-semibold tracking-wide text-foreground">
              Stack &amp; Architecture
            </h3>
            <p className="text-xs text-muted-foreground">
              Engineered with React Server Components, edge caching, and PostgreSQL.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <Badge variant="outline" className="font-mono text-[11px] font-normal">
                Next.js App Router
              </Badge>
              <Badge variant="outline" className="font-mono text-[11px] font-normal">
                PostgreSQL
              </Badge>
              <Badge variant="outline" className="font-mono text-[11px] font-normal">
                Prisma
              </Badge>
              <Badge variant="outline" className="font-mono text-[11px] font-normal">
                Tailwind CSS
              </Badge>
            </div>
          </div>
        </div>

        {/* Bottom Row: Copyright + Social Links */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} DevShelf Inc. Built by Anas. Open source under MIT.
          </p>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/anas20023"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded"
              aria-label="DevShelf on GitHub"
            >
              <GithubIcon className="size-4" />
            </a>
            <a
              href="https://www.facebook.com/anasib2000004"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded"
              aria-label="Anas on Facebook"
            >
              <FacebookIcon className="size-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/anasibelal004/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded"
              aria-label="Anas on LinkedIn"
            >
              <LinkedinIcon className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
