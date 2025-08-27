import { EmailAlreadyInUseError } from '../../errors/index.js';
import { updateUserSchema } from '../../schemas/index.js';
import {
    checkIfIdIsValid,
    emailAlreadyInUseResponse,
    invalidIdResponse,
    badRequest,
    ok,
    serverError,
} from '../helpers/index.js';
import { ZodError } from 'zod';
export class UpdateUserController {
    constructor(updateUserUseCase) {
        this.updateUserUseCase = updateUserUseCase;
    }

    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId;
            if (!checkIfIdIsValid(userId)) {
                return invalidIdResponse();
            }

            const updateUserParams = httpRequest.body;

            await updateUserSchema.parseAsync(updateUserParams);

            const updateUser = await this.updateUserUseCase.execute(
                userId,
                updateUserParams,
            );

            return ok(updateUser);
        } catch (error) {
            if (error instanceof ZodError) {
                return badRequest({ message: error.errors[0].message });
            }

            if (error instanceof EmailAlreadyInUseError) {
                return emailAlreadyInUseResponse(error.message);
            }

            console.error(error);
            return serverError();
        }
    }
}
