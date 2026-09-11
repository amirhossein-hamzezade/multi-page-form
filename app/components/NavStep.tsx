"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { cn } from "../utils/cn";
import { ChevronLeft } from "lucide-react";

export default function NavStep() {
  const steps = [
    { number: 1, path: "/section-one" },
    { number: 2, path: "/section-two" },
    { number: 3, path: "/section-three" },
    { number: 4, path: "/section-overview" },
  ];
  const pathname = usePathname();

  const currentStepIndex = steps.findIndex((step) => step.path === pathname);

  const showBackButton = currentStepIndex > 0;
  const previousStepPath = showBackButton
    ? steps[currentStepIndex - 1].path
    : "#";

  return (
    <div className="w-full flex flex-col items-center justify-center  gap-20 md:gap-2 md:h-full md:w-50">
      <div
        className={cn(
          "w-full flex justify-start md:-mt-12 transition-opacity duration-200",
          showBackButton
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
      >
        <Link
          href={previousStepPath}
          className="mt-0.5 mr-auto flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground cursor-pointer transition-colors px-1 py-0.5 rounded-sm focus-visible:outline-2 focus-visible:outline-ring"
        >
          <ChevronLeft size={16} />
          back
        </Link>
      </div>

      <div className="w-full max-w-sm flex justify-center md:justify-end items-center md:h-117">
        <div className="flex w-[75%] md:w-full items-center md:flex-col h-full justify-between">
          {steps.map((step, i) => {
            return (
              <React.Fragment key={i}>
                <Link
                  href={step.path}
                  className={cn(
                    "w-12 h-12 flex justify-center items-center rounded-full bg-secondary cursor-pointer hover:bg-muted hover:scale-80 transition-all",
                    pathname === step.path
                      ? "bg-primary text-primary-foreground hover:bg-primary"
                      : "",
                  )}
                >
                  <div className="w-full h-full flex justify-center items-center font-semibold">
                    {step.number}
                  </div>
                </Link>
                {i < steps.length - 1 && (
                  <div className="w-4 flex justify-center">
                    <div className="w-full md:h-15 md:w-0.5 bg-secondary h-0.5"></div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
