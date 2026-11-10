"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Laptop } from "lucide-react";
import { Button } from "@/components/ui/button";

function useIsMounted() {
  return React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const mounted = useIsMounted();

  if (!mounted) {
    return (
      <div 
        className="size-8 rounded-lg border border-border/60 bg-muted/30" 
        aria-hidden="true" 
      />
    );
  }

  const cycleTheme = () => {
    if (theme === "system") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("system");
    }
  };

  const getLabel = () => {
    if (theme === "system") return "Switch theme: System";
    if (theme === "dark") return "Switch theme: Dark";
    return "Switch theme: Light";
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={cycleTheme}
      title={getLabel()}
      aria-label={getLabel()}
    >
      {theme === "system" ? (
        <Laptop className="size-4 text-muted-foreground" />
      ) : resolvedTheme === "dark" ? (
        <Moon className="size-4 text-primary" />
      ) : (
        <Sun className="size-4 text-foreground" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

