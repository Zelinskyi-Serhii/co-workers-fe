import * as yup from "yup";

export const createCompanyValidationSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Name is required")
    .max(20, "Company name too long, max 20 characters"),
  ownerName: yup
    .string()
    .trim()
    .required("Owner name is required")
    .max(20, "Owner name too long, max 20 characters"),
  ownedAt: yup.string().trim().required("Owner date is required"),
});
