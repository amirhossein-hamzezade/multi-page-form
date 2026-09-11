"use server";
import { sectionTwoSchema } from "@/app/schemas";
import { ActionResponse, FormErrors } from "@/app/types";

export const sectionTwoFormAction = async (
  state: ActionResponse | undefined,
  formData: FormData,
): Promise<ActionResponse> => {
  const data = Object.fromEntries(formData.entries());
  console.log(data);
  const validated = sectionTwoSchema.safeParse(data);
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
