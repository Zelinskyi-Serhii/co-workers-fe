import * as yup from "yup";

export const updateCompanyValidationSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Name is required")
    .max(20, "Company name too long, max 20 characters"),
  ownerName: yup.string().trim().required("Owner name is required"),
  ownedAt: yup.string().trim().required("Owner date is required"),
});
