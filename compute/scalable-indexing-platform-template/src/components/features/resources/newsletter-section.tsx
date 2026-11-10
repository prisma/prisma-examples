"use client";

import * as React from "react";
import { Check, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function NewsletterSection() {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "error" | "success">("idle");
  const [errorMessage, setErrorMessage] = React.useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !emailRegex.test(email)) {
      setStatus("error");
      setErrorMessage("Enter a valid email address.");
      return;
    }

    setStatus("success");
    setErrorMessage("");
    setEmail("");
  };

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <Card className="border-border bg-card">
        <CardContent className="p-6 sm:p-8 md:p-10 text-center">
          <Badge variant="outline" className="mb-3 font-mono text-[11px]">
            Weekly Index Digest
          </Badge>

          <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground text-balance">
            Stay Ahead of New Index Additions
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto text-balance leading-relaxed">
            Every Thursday, we deliver 10 exceptional open-source systems, engineering tutorials, and architecture teardowns directly to your inbox.
          </p>

          {status === "success" ? (
            <div className="mt-6 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-2 text-xs font-medium">
              <Check className="size-4" />
              <span>Subscription confirmed. Welcome to the DevShelf index digest.</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-6 max-w-md mx-auto flex flex-col sm:flex-row items-center gap-2"
              noValidate
            >
              <div className="relative w-full">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  placeholder="name@organization.com"
                  aria-label="Email address for weekly resource digest"
                  aria-invalid={status === "error"}
                  className="h-9 text-xs"
                />
              </div>

              <Button
                type="submit"
                size="default"
                className="w-full sm:w-auto h-9 font-medium text-xs px-4 shrink-0"
              >
                Subscribe
              </Button>
            </form>
          )}

          {status === "error" && (
            <div className="mt-2 text-[11px] text-destructive flex items-center justify-center gap-1">
              <AlertCircle className="size-3" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="mt-3 text-[11px] text-muted-foreground">
            Zero spam. Unsubscribe with one click.
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

