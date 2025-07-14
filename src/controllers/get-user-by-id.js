import { GetUserByIdUseCase } from '../use-cases/index.js';
import {
    checkIfIdIsValid,
    invalidUserIdResponse,
    userNotFound,
    ok,
    serverError,
} from './helpers/index.js';

export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId;
            if (!checkIfIdIsValid(userId)) {
                return invalidUserIdResponse();
            }

            const getUserByIdUseCase = new GetUserByIdUseCase();
            const user = await getUserByIdUseCase.execute(userId);

            if (!user) {
                return userNotFound();
            }

            return ok(user);
        } catch (error) {
            console.log(error);
            return serverError();
        }
    }
}
