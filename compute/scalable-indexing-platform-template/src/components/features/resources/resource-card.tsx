import { Resource } from "@/lib/types";
import { ExternalLink, Star } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ResourceCardProps {
  resource: Resource;
}

function formatSimulatedDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date("2026-11-03T20:22:20Z");
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) return "Indexed today";
    if (diffDays === 1) return "Indexed yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch {
    return "Recently indexed";
  }
}

export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <article className="h-full flex flex-col">
      <Card className="h-full flex flex-col justify-between border-border/80 bg-card hover:border-primary/50 transition-colors">
        <div>
          {/* Top Bar: Category badge on left, Difficulty pill on right */}
          <CardHeader className="pb-3 flex flex-row items-center justify-between gap-2">
            <Badge variant="outline" className="font-medium text-xs">
              {resource.category}
            </Badge>

            <span className="font-mono text-[11px] text-muted-foreground flex items-center gap-1">
              <span
                className={`size-1.5 rounded-full ${
                  resource.difficulty === "Beginner"
                    ? "bg-emerald-500"
                    : resource.difficulty === "Intermediate"
                    ? "bg-amber-500"
                    : "bg-rose-500"
                }`}
              />
              {resource.difficulty}
            </span>
          </CardHeader>

          {/* Content: H3 Resource Title & 2-line clamped description */}
          <CardContent className="space-y-2">
            <CardTitle className="text-base font-semibold text-foreground leading-snug line-clamp-2">
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline"
              >
                <h3>{resource.title}</h3>
              </a>
            </CardTitle>

            <CardDescription className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
              {resource.description}
            </CardDescription>

            {/* Tags Row: Hashtag chips */}
            <div className="pt-2 flex flex-wrap gap-1" aria-label="Resource tags">
              {resource.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="font-mono text-[10px] px-1.5 py-0 h-4 font-normal"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </div>

        {/* Card Footer: External link indicator and simulated indexed date */}
        <CardFooter className="pt-3 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
          <time dateTime={resource.createdAt} className="font-mono text-[11px]">
            {formatSimulatedDate(resource.createdAt)}
          </time>

          <div className="flex items-center gap-3">
            {resource.stars ? (
              <span className="flex items-center gap-1 font-mono text-[11px]">
                <Star className="size-3 text-amber-500 fill-amber-500" />
                {(resource.stars / 1000).toFixed(1)}k
              </span>
            ) : null}

            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-foreground hover:text-primary font-medium transition-colors"
              aria-label={`Open repository for ${resource.title}`}
            >
              <span>Repo</span>
              <ExternalLink className="size-3" />
            </a>
          </div>
        </CardFooter>
      </Card>
    </article>
  );
}

