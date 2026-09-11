"use server";
import {
  sectionOneSchema,
  sectionTwoSchema,
  sectionThreeSchema,
} from "@/app/schemas";
import { ActionResponse, FormErrors } from "@/app/types";

export const finalFormSubmitAction = async (
  state: ActionResponse | undefined,
  formData: FormData,
): Promise<ActionResponse> => {
  const rawData = Object.fromEntries(formData.entries());

  // Validate all structural parts simultaneously
  const checkOne = sectionOneSchema.safeParse(rawData);
  const checkTwo = sectionTwoSchema.safeParse(rawData);
  const checkThree = sectionThreeSchema.safeParse(rawData);

  if (!checkOne.success || !checkTwo.success || !checkThree.success) {
    const allIssues = [
      ...(checkOne.error?.issues || []),
      ...(checkTwo.error?.issues || []),
      ...(checkThree.error?.issues || []),
    ];

    const errors = allIssues.reduce((acc: FormErrors, issue) => {
      const key = issue.path[0] as string;
      acc[key] = issue.message;
      return acc;
    }, {});

    return {
      success: false,
      errors,
    };
  }

  // --- DATABASE OPERATION CORNER ---
  // console.log("Saving full onboarding record:", rawData);
  // await db.user.create({ data: ... })
  // ---------------------------------

  return {
    success: true,
    errors: {},
  };
};
