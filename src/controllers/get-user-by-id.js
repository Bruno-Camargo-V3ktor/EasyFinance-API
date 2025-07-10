import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.js';
import { badRequest, ok, serverError } from './helpers.js';
import validator from 'validator';

export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId;

            const idIsValid = validator.isUUID(userId);
            if (!idIsValid) {
                return badRequest({ message: 'The provided ID is not valid.' });
            }

            const getUserByIdUseCase = new GetUserByIdUseCase();
            const user = await getUserByIdUseCase.execute(userId);

            return ok(user);
        } catch (error) {
            console.log(error);
            return serverError;
        }
    }
}
