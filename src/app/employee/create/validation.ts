import * as yup from "yup";

export const createEmployeeValidationSchema = yup.object().shape({
  firstname: yup
    .string()
    .trim()
    .required("Firstname is required")
    .max(20, "Firstname too long, max 20 characters"),
  lastname: yup
    .string()
    .trim()
    .required("Lastname is required")
    .max(20, "Lastname too long, max 20 characters"),
  position: yup
    .string()
    .trim()
    .required("Position is required")
    .max(20, "Position too long, max 20 characters"),
  hireDate: yup.string().required("Hire date is required"),
  birthday: yup.string().required("Birthday is required"),
});
