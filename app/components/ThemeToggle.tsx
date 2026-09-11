"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { Sun, Moon } from "lucide-react";

// An empty subscriber function because we only care about tracking the client-side mounting
const emptySubscribe = () => () => {};

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  // Returns true on the client, and false on the server layout pass
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  // Safely render placeholder skeleton on the server pass to avoid hydration mismatches
  if (!isMounted) {
    return (
      <div className="w-10 h-10 rounded-md border border-border bg-card" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="p-2.5 rounded-md border border-border bg-card text-foreground cursor-pointer transition-colors duration-200 hover:bg-muted focus:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
      aria-label="Toggle theme mode"
    >
      {isDark ? (
        <Sun className="h-[1.2rem] w-[1.2rem] text-foreground transition-all" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] text-foreground transition-all" />
      )}
    </button>
  );
}
