"use client";
import Input from "@/app/components/Input";
import { ActionResponse, LocalStorageFormData } from "@/app/types";
import React, { useActionState, useEffect, useState } from "react";
import { sectionOneFormAction } from "./actions";
import { useRouter } from "next/navigation";

const initialState: ActionResponse = { success: false, errors: {} };

export default function SectionOne() {
  const router = useRouter();
  const [serverResponse, formAction] = useActionState(
    sectionOneFormAction,
    initialState,
  );
  const [formData, setFormData] = useState<LocalStorageFormData>(() => {
    // This code runs strictly on initialization
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("sectionOneData");
      return data ? JSON.parse(data) : {};
    }
    return {}; // Fallback for Server-Side Rendering
  });

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const updatedData = { ...formData, [e.target.name]: e.target.value };
    setFormData(updatedData);
    localStorage.setItem("sectionOneData", JSON.stringify(updatedData));
  };

  console.log(formData);

  useEffect(() => {
    if (serverResponse.success) {
      localStorage.removeItem("sectionOneData");
      router.push("/section-two");
    }
  }, [serverResponse.success, router]);

  return (
    <div className="w-full h-full flex flex-col items-center md:items-center  md:justify-center">
      <form
        action={formAction}
        className="flex flex-col rounded-xl bg-card border border-border w-full mt-4 max-w-sm h-104  md:mt-0 px-5 content-start"
      >
        <p className="font-semibold text-2xl tracking-tight mt-10">
          create an acount
        </p>
        <p className="text-start mt-3">
          Enter your name and last name below to continue
        </p>
        <div className="flex flex-col mt-7 gap-5">
          <Input
            label="Name"
            id="name"
            type="text"
            name="name"
            errorMessage={serverResponse.errors.name ?? ""}
            value={formData.name ?? ""}
            onChange={handleInputChange}
          />
          <Input
            label="Last Name"
            id="lastname"
            type="text"
            name="lastName"
            errorMessage={serverResponse.errors.lastName ?? ""}
            value={formData.lastName ?? ""}
            onChange={handleInputChange}
          />
        </div>
        <button
          className="mt-9 w-full bg-primary text-primary-foreground rounded-md h-8"
          type="submit"
        >
          continue
        </button>
      </form>
    </div>
  );
}
