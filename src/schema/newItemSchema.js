import * as yup from "yup";

export const newItemSchema = () =>
  yup.object().shape({
    categoryId: yup.string().required("Required."),
    productName: yup.string().required("Required.").max(100, "Max. 100 chars."),
    description: yup.string().required("Required.").max(250, "Max. 250 chars."),
    price: yup.number().typeError("Must be a number"),
    stock: yup.number().typeError("Must be a number"),
  });
