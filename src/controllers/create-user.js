import { CreateUserUseCase } from '../use-cases/create-user.js';
import validator from 'validator';

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
                    return {
                        statusCode: 400,
                        body: {
                            errorMessage: `Missing param: ${field}`,
                        },
                    };
                }
            }

            const passwordIsValid = params.password.length < 6;
            if (!passwordIsValid) {
                return {
                    statusCode: 400,
                    body: {
                        errorMessage: 'Password must be at least 6 characteres',
                    },
                };
            }

            const emailIsValid = validator.isEmail(params.email);
            if (!emailIsValid) {
                return {
                    statusCode: 400,
                    body: {
                        errorMessage:
                            'Invalid e-mail. Plase provida a valid one.',
                    },
                };
            }

            const createUserUseCase = new CreateUserUseCase();
            const createdUser = await createUserUseCase.execute(params);

            return {
                statusCode: 201,
                body: createdUser,
            };
        } catch (error) {
            console.error(error);
            return {
                statusCode: 500,
                body: {
                    errorMessage: `Internal server error...`,
                },
            };
        }
    }
}
