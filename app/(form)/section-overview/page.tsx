"use client";
import React, { useActionState, useEffect, useState } from "react";
import { finalFormSubmitAction } from "./actions";
import { useRouter } from "next/navigation";
import { ActionResponse, FormData } from "@/app/types";
import Link from "next/link";

import {
  sectionOneSchema,
  sectionTwoSchema,
  sectionThreeSchema,
} from "@/app/schemas";

const initialState: ActionResponse = { success: false, errors: {} };

function getStoredData(): Partial<FormData> {
  if (typeof window === "undefined") return {};
  const s1 = JSON.parse(localStorage.getItem("sectionOneData") || "{}");
  const s2 = JSON.parse(localStorage.getItem("sectionTwoData") || "{}");
  const s3 = JSON.parse(localStorage.getItem("sectionThreeData") || "{}");
  return { ...s1, ...s2, ...s3 };
}

export default function SectionOverview() {
  const router = useRouter();
  const [serverResponse, formAction] = useActionState(
    finalFormSubmitAction,
    initialState,
  );

  const [masterData] = useState<Partial<FormData>>(getStoredData);
  const [isMounted, setIsMounted] = useState(false);

  const [localValidationErrors, setLocalValidationErrors] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setIsMounted(true);

      const checkOne = sectionOneSchema.safeParse(masterData);
      const checkTwo = sectionTwoSchema.safeParse(masterData);
      const checkThree = sectionThreeSchema.safeParse(masterData);

      const newErrors: Record<string, string> = {};

      [checkOne, checkTwo, checkThree].forEach((result) => {
        if (!result.success) {
          result.error.issues.forEach((issue) => {
            const key = issue.path[0] as string;
            newErrors[key] = issue.message;
          });
        }
      });

      setLocalValidationErrors(newErrors);
    });
    return () => cancelAnimationFrame(id);
  }, [masterData]);

  useEffect(() => {
    if (serverResponse.success) {
      localStorage.removeItem("sectionOneData");
      localStorage.removeItem("sectionTwoData");
      localStorage.removeItem("sectionThreeData");
      alert("Registration completed successfully!");
      router.push("/section-one");
    }
  }, [serverResponse.success, router]);

  if (!isMounted) return null;

  const getFieldError = (fieldName: string) => {
    return serverResponse.errors[fieldName] || localValidationErrors[fieldName];
  };

  const dataRows = [
    {
      label: "First Name",
      value: masterData.name,
      editPath: "/section-one",
      err: getFieldError("name"),
    },
    {
      label: "Last Name",
      value: masterData.lastName,
      editPath: "/section-one",
      err: getFieldError("lastName"),
    },
    {
      label: "Email Address",
      value: masterData.email,
      editPath: "/section-two",
      err: getFieldError("email"),
    },
    {
      label: "Date of Birth",
      value: masterData.birthDate,
      editPath: "/section-two",
      err: getFieldError("birthDate"),
    },
    {
      label: "Username",
      value: masterData.username,
      editPath: "/section-three",
      err: getFieldError("username"),
    },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center md:justify-center">
      <form
        action={formAction}
        className="flex flex-col rounded-xl bg-card border border-border w-full mt-4 max-w-sm p-5 content-start"
      >
        <input type="hidden" name="name" value={masterData.name || ""} />
        <input
          type="hidden"
          name="lastName"
          value={masterData.lastName || ""}
        />
        <input type="hidden" name="email" value={masterData.email || ""} />
        <input
          type="hidden"
          name="birthDate"
          value={masterData.birthDate || ""}
        />
        <input
          type="hidden"
          name="username"
          value={masterData.username || ""}
        />
        <input
          type="hidden"
          name="password"
          value={masterData.password || ""}
        />

        <p className="font-semibold text-2xl tracking-tight mt-4">
          Review Account
        </p>
        <p className="text-start mt-2 text-sm text-muted-foreground mb-4">
          Double check your parameters before submission.
        </p>

        <div className="flex flex-col gap-3 my-2 border-y border-border py-4">
          {dataRows.map((row, idx) => (
            <div key={idx} className="flex flex-col gap-0.5">
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium text-muted-foreground">
                  {row.label}:
                </span>
                <div className="flex items-center gap-2">
                  <span
                    className={
                      row.err
                        ? "text-red-400 max-w-40 truncate font-semibold"
                        : "text-foreground max-w-40 truncate font-semibold"
                    }
                  >
                    {row.value || (
                      <span className="text-red-400 text-xs italic">
                        Missing
                      </span>
                    )}
                  </span>
                  <Link
                    href={row.editPath}
                    className="text-xs text-primary underline hover:opacity-80"
                  >
                    Edit
                  </Link>
                </div>
              </div>
              {row.err && (
                <p className="text-right text-[10px] text-red-400 mt-0.5">
                  {row.err}
                </p>
              )}
            </div>
          ))}
        </div>

        <button
          className="mt-6 w-full bg-primary text-primary-foreground rounded-md h-9 font-medium cursor-pointer hover:opacity-90 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={Object.keys(localValidationErrors).length > 0}
        >
          Submit Account Request
        </button>
      </form>
    </div>
  );
}
