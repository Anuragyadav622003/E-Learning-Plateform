import { z } from "zod";

const loginSchema = z.object({
  
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
 
});

export default loginSchema;
