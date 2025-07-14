import { CreateUserUseCase } from '../use-cases/index.js';
import { EmailAlreadyInUseError } from '../errors/index.js';
import {
    checkIfEmailIsValid,
    checkIfPasswordIsValid,
    emailAlreadyInUseResponse,
    invalidEmailResponse,
    invalidPasswordResponse,
    badRequest,
    created,
    serverError,
} from './helpers/index.js';

export class CreateUserController {
    async execute(httpRequest) {
        try {
            const params = httpRequest.body;
            const requiredFields = [
                'firstName',
                'lastName',
                'email',
                'password',
            ];

            for (const field of requiredFields) {
                if (!params[field] || params[field].trim().length <= 2) {
                    return badRequest({ message: `Missing param: ${field}` });
                }
            }

            if (!checkIfPasswordIsValid(params.password)) {
                return invalidPasswordResponse();
            }

            if (!checkIfEmailIsValid(params.email)) {
                return invalidEmailResponse();
            }

            const createUserUseCase = new CreateUserUseCase();
            const createdUser = await createUserUseCase.execute(params);

            return created(createdUser);
        } catch (error) {
            if (error instanceof EmailAlreadyInUseError) {
                return emailAlreadyInUseResponse(error.message);
            }

            console.error(error);
            return serverError();
        }
    }
}
