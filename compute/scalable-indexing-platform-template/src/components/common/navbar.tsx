import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/85 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-15 flex items-center justify-between gap-4">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="DevShelf Indexer"
          >
            {/* Minimalist architectural mark */}
            <div className="flex items-center justify-center size-8 rounded-lg bg-foreground text-background font-mono font-bold text-sm tracking-tight select-none">
              D/S
            </div>
            <div className="flex items-center gap-2">
              <span className="font-heading text-lg font-bold tracking-tight text-foreground">
                DevShelf
              </span>
              <Badge variant="outline" className="font-mono text-[10px] px-1.5 py-0 h-4">
                v1.0
              </Badge>
            </div>
          </Link>
        </div>

        {/* Right: Navigation & Controls */}
        <nav aria-label="Primary Navigation" className="flex items-center gap-2 sm:gap-3">
          <div className="hidden md:flex items-center gap-1">
            <Link
              href="/#catalog"
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              Explore
            </Link>
            <Link
              href="/#docs"
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              Documentation
            </Link> 
            <a
              href="https://github.com/anas20023"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              GitHub
            </a>
          </div>

          <Separator orientation="vertical" className="hidden sm:block" />

          {/* Persistent Theme Switcher */}
          <ThemeToggle />

          {/* Developer Chip: "Built by Anas" */}
          <a
            href="https://github.com/anas20023"
            target="_blank"
            rel="noopener noreferrer"
            title="Created by Anas"
            className="group flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full border border-border bg-muted/40 hover:bg-muted text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Avatar className="size-5 border border-border">
              <AvatarFallback className="bg-primary text-primary-foreground font-mono text-[10px] font-bold">
                A
              </AvatarFallback>
            </Avatar>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-muted-foreground">Built by</span>
              <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                Anas
              </span>
            </div>
          </a>
        </nav>
      </div>
    </header>
  );
}
