import { CreateUserUseCase } from '../use-cases/create-user.js';
import validator from 'validator';
import { badRequest, created, serverError } from './helpers.js';

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

            const passwordIsValid = params.password.length >= 6;
            if (!passwordIsValid) {
                return badRequest({
                    message: 'Password must be at least 6 characteres',
                });
            }

            const emailIsValid = validator.isEmail(params.email);
            if (!emailIsValid) {
                return badRequest({
                    message: 'Invalid e-mail. Plase provida a valid one.',
                });
            }

            const createUserUseCase = new CreateUserUseCase();
            const createdUser = await createUserUseCase.execute(params);

            return created(createdUser);
        } catch (error) {
            console.error(error);
            return serverError();
        }
    }
}
