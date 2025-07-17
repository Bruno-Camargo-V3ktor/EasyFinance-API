import {
    checkIfIdIsValid,
    invalidUserIdResponse,
    ok,
    serverError,
    userNotFound,
} from '../helpers/index.js';

export class DeleteUserController {
    constructor(deleteUserUseCase) {
        this.deleteUserUseCase = deleteUserUseCase;
    }

    async execute(httpRequest) {
        const userId = httpRequest.params.userId;
        if (checkIfIdIsValid(userId)) {
            return invalidUserIdResponse();
        }

        try {
            const deletedUser = await this.deleteUserUseCase.execute(userId);

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
