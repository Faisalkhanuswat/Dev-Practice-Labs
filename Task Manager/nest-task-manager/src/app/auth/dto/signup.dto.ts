import { z } from "zod";
import { signupValidationSchema } from "../validations/signup.schema";

export type SignupDto = z.infer<typeof signupValidationSchema>;