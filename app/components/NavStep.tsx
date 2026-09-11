"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { cn } from "../utils/cn";

export default function NavStep() {
  const steps = [
    { number: 1, path: "/section-one" },
    { number: 2, path: "/section-two" },
    { number: 3, path: "/section-three" },
    { number: 4, path: "/section-overview" },
  ];
  const pathname = usePathname();

  return (
    <div className="w-full flex flex-col border border-red-500 items-center justify-center  gap-25 md:gap-2 md:h-full md:w-50 ">
      <div className="w-full flex justify-start border border-gray-950 md:-mt-12">
        <Link
          href="#"
          className="mt-0.5 mr-auto flex justify-center items-center  border border-gray-900"
        >
          back
        </Link>
      </div>
      <div className=" w-full max-w-sm flex justify-center md:justify-end items-center md:h-117 ">
        <div className="flex w-[75%] md:w-full items-center md:flex-col h-full justify-between border border-gray-600">
          {steps.map((step, i) => {
            return (
              <React.Fragment key={i}>
                <Link
                  href={step.path}
                  className={cn(
                    "w-12 h-12 flex justify-center items-center rounded-full bg-secondary cursor-pointer hover:bg-muted hover:scale-80 transition-all",
                    pathname === step.path ? "bg-primary hover:bg-primary" : "",
                  )}
                >
                  <div className="w-full h-full flex justify-center items-center">
                    {step.number}
                  </div>
                </Link>
                {i < steps.length - 1 && (
                  <div className="w-4 flex justify-center">
                    <div className=" w-full md:h-15 md:w-0.5 bg-secondary h-0.5"></div>
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
