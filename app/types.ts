export type FormErrors = {
  [key: string]: string | undefined;
};

export type FormData = {
  name: string;
  lastName: string;
  email: string;
  birthDate: string;
};

export type LocalStorageFormData = Partial<FormData>;

export type ActionResponse = {
  success: boolean;
  errors: FormErrors;
};
