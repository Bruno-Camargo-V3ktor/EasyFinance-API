import { z } from 'zod';

export const createUserSchema = z.object({
    first_name: z
        .string()
        .trim()
        .min(1, { message: 'First name is required.' }),
    last_name: z.string().trim().min(1, { message: 'Last name is required.' }),
    email: z
        .email({
            message: 'Please provide a valid e-mail.',
            required_error: 'Password is required.',
        })
        .trim(),
    password: z
        .string({ required_error: 'Password is required.' })
        .trim()
        .min(6, { message: 'Password must have at least 6 characters.' }),
});
