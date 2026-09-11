"use server";
import { sectionThreeSchema } from "@/app/schemas";
import { ActionResponse, FormErrors } from "@/app/types";

export const sectionThreeFormAction = async (
  state: ActionResponse | undefined,
  formData: FormData,
): Promise<ActionResponse> => {
  const data = Object.fromEntries(formData.entries());
  const validated = sectionThreeSchema.safeParse(data);

  if (!validated.success) {
    const errors = validated.error.issues.reduce((acc: FormErrors, issue) => {
      const key = issue.path[0] as string;
      acc[key] = issue.message;
      return acc;
    }, {});

    return {
      success: false,
      errors: errors,
    };
  }

  return {
    success: true,
    errors: {},
  };
};
