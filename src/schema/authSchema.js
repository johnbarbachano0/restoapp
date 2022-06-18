import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().required("Required.").email("Invalid email format."),
  password: yup.string().required("Required.").min(4, "Min. 4 chars"),
});

export const registerSchema = yup.object().shape({
  email: yup.string().required("Required.").email("Invalid email format."),
  password: yup.string().required("Required.").min(4, "Min. 4 characters"),
  rePassword: yup
    .string()
    .required("Required.")
    .oneOf([yup.ref("password"), null], "Passwords do not match."),
});
