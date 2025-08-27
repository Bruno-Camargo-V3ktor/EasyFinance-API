import { z } from 'zod';

export const createTransactionSchema = z.object({
    user_id: z.uuid({ message: 'User ID must be a valid UUID' }),
    name: z.string().trim().min(1, {
        message: 'Name is required',
    }),
    date: z.coerce.date(),
    type: z.enum(['EXPENSE', 'EARNING', 'INVESTMENT'], {
        message: 'Type must be EXPENSE, EARNING or INVESTMENT',
    }),
    amount: z
        .number({ invalid_type_error: 'Amount must be a number.' })
        .positive()
        .min(1, {
            message: 'Amount must be greater than 0.',
        }),
});
