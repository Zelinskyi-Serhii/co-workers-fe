import * as yup from "yup";

export const reviewValidationSchema = yup.object().shape({
  review: yup
    .string()
    .trim()
    .required("Review is required")
    .max(500, "Nickname too long, max 500 characters"),
});
