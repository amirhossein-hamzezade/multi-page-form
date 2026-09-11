import z from "zod";
const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/;

export const sectionOneSchema = z.object({
  name: z
    .string()
    .min(1, "Please Enter a name for yout Account")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters"),
  lastName: z
    .string()
    .min(1, "Please Enter a last name for your account")
    .regex(/^[a-zA-Z\s]+$/, "lastName can only contain letters"),
});

export const sectionTwoSchema = z.object({
  email: z.email({ error: "Please enter a valid email address" }),
  birthDate: z
    .string()
    .min(1, "Birth date is required")
    .regex(dateRegex, "Please enter a valid date in dd/MM/yyyy format"),
});
