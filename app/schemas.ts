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

export const sectionThreeSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores",
    ),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});
