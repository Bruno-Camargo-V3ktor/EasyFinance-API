import { DeleteUserUseCase } from '../use-cases/index.js';
import {
    checkIfIdIsValid,
    invalidUserIdResponse,
    ok,
    serverError,
    userNotFound,
} from './helpers/index.js';

export class DeleteUserController {
    async execute(httpRequest) {
        const userId = httpRequest.params.userId;
        if (checkIfIdIsValid(userId)) {
            return invalidUserIdResponse();
        }

        try {
            const deleteUserUseCase = new DeleteUserUseCase();
            const deletedUser = await deleteUserUseCase.execute(userId);

            if (!deletedUser) {
                return userNotFound();
            }

            return ok(deletedUser);
        } catch (error) {
            console.error(error);
            return serverError();
        }
    }
}
