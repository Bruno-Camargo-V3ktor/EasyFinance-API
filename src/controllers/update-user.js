import { EmailAlreadyInUseError } from '../errors/user.js';
import { UpdateUserUseCase } from '../use-cases/update-user.js';
import {
    checkIfEmailIsValid,
    checkIfIdIsValid,
    checkIfPasswordIsValid,
    emailAlreadyInUseResponse,
    invalidEmailResponse,
    invalidPasswordResponse,
    invalidUserIdResponse,
} from './helpers/user.js';
import { badRequest, ok, serverError } from './helpers/http.js';

export class UpdateUserController {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId;
            if (!checkIfIdIsValid(userId)) {
                return invalidUserIdResponse();
            }

            const updateUserParams = httpRequest.body;
            if (!updateUserParams) {
                return badRequest({ message: 'The providade a body empty.' });
            }

            const allowedFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ];

            const someFieldIsNoAllowed = Object.keys(updateUserParams).some(
                (field) => !allowedFields.includes(field),
            );

            if (someFieldIsNoAllowed) {
                return badRequest({
                    message: 'Some provided field is not allowed.',
                });
            }

            if (updateUserParams.password) {
                if (!checkIfPasswordIsValid(updateUserParams.password)) {
                    return invalidPasswordResponse();
                }
            }

            if (updateUserParams.email) {
                if (!checkIfEmailIsValid(updateUserParams.email)) {
                    return invalidEmailResponse();
                }
            }

            const updateUserUseCase = new UpdateUserUseCase();
            const updateUser = await updateUserUseCase.execute(
                userId,
                updateUserParams,
            );

            return ok(updateUser);
        } catch (error) {
            if (error instanceof EmailAlreadyInUseError) {
                return emailAlreadyInUseResponse(error.message);
            }

            console.error(error);
            return serverError();
        }
    }
}
