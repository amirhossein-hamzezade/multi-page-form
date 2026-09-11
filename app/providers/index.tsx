"use client";

import { ThemeProvider } from "./theme-provider";
// import { AuthProvider } from "./auth-provider"; // Example future provider

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      {/* <AuthProvider> */}
      {children}
      {/* </AuthProvider> */}
    </ThemeProvider>
  );
}
