"use client";
import Input from "@/app/components/Input";
import { ActionResponse, LocalStorageFormData } from "@/app/types";
import React, { useActionState, useEffect, useState } from "react";
import { sectionThreeFormAction } from "./actions";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react"; // 👈 Import icons explicitly

const initialState: ActionResponse = { success: false, errors: {} };

export default function SectionThree() {
  const router = useRouter();
  const [serverResponse, formAction] = useActionState(
    sectionThreeFormAction,
    initialState,
  );

  // Custom local parameter controlling visibility text state
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState<LocalStorageFormData>(() => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("sectionThreeData");
      return data ? JSON.parse(data) : {};
    }
    return {};
  });

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const updatedData = { ...formData, [e.target.name]: e.target.value };
    setFormData(updatedData);
    localStorage.setItem("sectionThreeData", JSON.stringify(updatedData));
  };

  useEffect(() => {
    if (serverResponse.success) {
      router.push("/section-overview");
    }
  }, [serverResponse.success, router]);

  return (
    <div className="w-full h-full flex flex-col items-center md:justify-center">
      <form
        action={formAction}
        className="flex flex-col rounded-xl bg-card border border-border w-full mt-4 max-w-sm h-104 px-5 content-start"
      >
        <p className="font-semibold text-2xl tracking-tight mt-10">
          Security Details
        </p>
        <p className="text-start mt-3 text-sm text-muted-foreground">
          Create a unique username and a strong password.
        </p>

        <div className="flex flex-col mt-7 gap-5">
          <Input
            label="Username"
            id="username"
            type="text"
            name="username"
            errorMessage={serverResponse.errors.username ?? ""}
            value={formData.username ?? ""}
            onChange={handleInputChange}
          />

          <Input
            label="Password"
            id="password"
            // Toggle dynamically between "text" and "password" types
            type={showPassword ? "text" : "password"}
            name="password"
            errorMessage={serverResponse.errors.password ?? ""}
            value={formData.password ?? ""}
            onChange={handleInputChange}
            // Pass the interactive layout block straight to the slot
            rightElement={
              <button
                type="button" // ⚠️ CRITICAL: Prevents button from submitting form natively
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            }
          />
        </div>

        <button
          className="mt-9 w-full bg-primary text-primary-foreground rounded-md h-8 cursor-pointer hover:opacity-90 transition-all"
          type="submit"
        >
          continue
        </button>
      </form>
    </div>
  );
}
