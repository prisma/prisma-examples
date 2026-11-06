import { Resource } from "@/lib/types";
import { ExternalLink, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ResourceListItemProps {
  resource: Resource;
}

export function ResourceListItem({ resource }: ResourceListItemProps) {
  return (
    <article className="group flex flex-col md:flex-row md:items-center justify-between gap-3 p-3.5 rounded-lg border border-border/70 bg-card hover:border-primary/50 transition-colors">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <Badge variant="outline" className="font-medium text-[11px] h-4.5">
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
          <span className="text-muted-foreground text-xs hidden md:inline">·</span>
          <span className="text-xs text-muted-foreground hidden md:inline">
            by {resource.author || "Contributor"}
          </span>
        </div>

        <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            {resource.title}
          </a>
        </h3>

        <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1 leading-normal">
          {resource.description}
        </p>
      </div>

      <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-border/40">
        <div className="hidden lg:flex items-center gap-1">
          {resource.tags.slice(0, 3).map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="font-mono text-[10px] px-1.5 py-0 h-4 font-normal"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {resource.stars ? (
          <span className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
            <Star className="size-3 text-amber-500 fill-amber-500" />
            {(resource.stars / 1000).toFixed(1)}k
          </span>
        ) : null}

        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-foreground hover:text-primary font-medium"
        >
          <span>Repo</span>
          <ExternalLink className="size-3" />
        </a>
      </div>
    </article>
  );
}

