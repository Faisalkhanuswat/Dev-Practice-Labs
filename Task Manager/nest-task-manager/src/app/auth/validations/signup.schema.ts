import { z } from "zod";

export const signupValidationSchema = z.object({
    name: z.string().nonempty('Name is requied field').max(12, "Name can't exceed 12 characters."),
    username: z.string().nonempty('Username is requied field').max(12, "Username can't exceed 12 cahracters.")
        .transform(val => val.toLowerCase()),
    password: z.string().nonempty('Passwrod is requied field').min(8, 'Password is at least 8 characters long')
        .max(16, "Password can't be exceed 16 characters")
})