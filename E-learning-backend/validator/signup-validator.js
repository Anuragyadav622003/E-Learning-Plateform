import { z } from "zod";

const signupSchema = z.object({
  username: z
    .string({ required_error: "Name is Required" })
    .trim()
    .min(3, { message: "Name Must be atleast 3 char" })
    .max(255, { message: "Name not be more than 255 char" }),
  email: z
    .string({ required_error: "Email is Required" })
    .trim()
    .email({ message: "Invalid Email address" })
    .min(3, { message: "Email Must be atleast 3 char" })
    .max(255, { message: "Email not be more than 255 char" }),
  password: z
    .string({ required_error: "Password is Required" })
    .min(4, { message: "Password Must be atleast 4 char" })
    .max(1024, { message: "Password not be more than 1024 char" }),
  mobileNumber: z
    .string({ required_error: " mobileNumber is Required" })
    .trim()
    .min(10, { message: " mobileNumber Must be atleast 10 char" })
    .max(11, { message: " mobileNumber not be more than 11 char" }),
});

export default signupSchema;