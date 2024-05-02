import * as yup from "yup";

export const signUpValidationSchema = yup.object().shape({
  nickname: yup
    .string()
    .trim()
    .required("Nickname is required")
    .max(20, "Nickname too long, max 20 characters"),
  // email: yup.string().email("Invalid email").required("Email is required"),
  email: yup
    .string()
    .required("Email is required")
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Wrong email format"
    ),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(16, "Password must be no longer then 16 characters")
    .required("Password is required"),
});

export const signInValidationSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(16, "Password must be no longer then 16 characters")
    .required("Password is required"),
});
