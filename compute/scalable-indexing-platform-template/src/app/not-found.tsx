import Link from "next/link";
import { ArrowLeft, SearchCode } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function NotFound() {
  const popularCategories = [
    { name: "Web Dev", href: "/?cat=Web+Dev" },
    { name: "Machine Learning", href: "/?cat=Machine+Learning" },
    { name: "DevOps", href: "/?cat=DevOps" },
    { name: "Cybersecurity", href: "/?cat=Cybersecurity" },
    { name: "Cloud Computing", href: "/?cat=Cloud+Computing" },
  ];

  return (
    <div className="flex-1 flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full text-center p-8 rounded-2xl border border-border bg-card shadow-xs">
        <div className="size-12 rounded-xl bg-muted text-muted-foreground mx-auto flex items-center justify-center mb-4">
          <SearchCode className="size-6 text-primary" />
        </div>

        <Badge variant="outline" className="font-mono text-[11px] mb-2">
          HTTP 404
        </Badge>

        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          Resource not found
        </h1>

        <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
          The requested path or resource record does not exist in the DevShelf index catalog.
        </p>

        {/* Suggested Quick Links */}
        <div className="mt-6 pt-5 border-t border-border/70 text-left">
          <span className="text-xs font-semibold text-foreground block mb-2">
            Explore active indexes:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {popularCategories.map((c) => (
              <Link
                key={c.name}
                href={c.href}
                className={buttonVariants({ variant: "secondary", size: "xs" })}
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <Link
            href="/"
            className={cn(buttonVariants({ variant: "default", size: "sm" }), "w-full gap-2")}
          >
            <ArrowLeft className="size-3.5" />
            <span>Return to DevShelf Catalog</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
