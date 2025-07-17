import { EmailAlreadyInUseError } from '../../errors/index.js';
import {
    checkIfEmailIsValid,
    checkIfIdIsValid,
    checkIfPasswordIsValid,
    emailAlreadyInUseResponse,
    invalidEmailResponse,
    invalidPasswordResponse,
    invalidUserIdResponse,
    badRequest,
    ok,
    serverError,
} from '../helpers/index.js';

export class UpdateUserController {
    constructor(updateUserUseCase) {
        this.updateUserUseCase = updateUserUseCase;
    }

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

            const updateUser = await this.updateUserUseCase.execute(
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
