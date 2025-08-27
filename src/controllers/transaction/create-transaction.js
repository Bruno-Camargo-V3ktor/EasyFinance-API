import { createTransactionSchema } from '../../schemas/index.js';
import { badRequest, created, serverError } from '../helpers/index.js';
import { ZodError } from 'zod';

export class CreateTransactionController {
    constructor(createTransactionUseCase) {
        this.createTransactionUseCase = createTransactionUseCase;
    }

    async execute(httpRequest) {
        try {
            const params = httpRequest.body;

            await createTransactionSchema.parseAsync(params);

            const type = params.type.trim().toUpperCase();
            const transaction = await this.createTransactionUseCase.execute({
                ...params,
                type,
            });

            return created(transaction);
        } catch (error) {
            if (error instanceof ZodError) {
                return badRequest({
                    message: error.errors[0].message,
                });
            }

            console.error(error);
            return serverError();
        }
    }
}
