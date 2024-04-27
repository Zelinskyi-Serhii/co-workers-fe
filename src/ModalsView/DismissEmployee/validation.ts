import * as yup from "yup";

export const dismissEmployeeValidationSchema = yup.object().shape({
  dismissDate: yup.string().required("Dismiss date is required"),
});
