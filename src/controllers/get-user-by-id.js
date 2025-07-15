import {
    checkIfIdIsValid,
    invalidUserIdResponse,
    userNotFound,
    ok,
    serverError,
} from './helpers/index.js';

export class GetUserByIdController {
    constructor(getUserByIdUseCaseRepository) {
        this.getUserByIdUseCaseRepository = getUserByIdUseCaseRepository;
    }

    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId;
            if (!checkIfIdIsValid(userId)) {
                return invalidUserIdResponse();
            }

            const user =
                await this.getUserByIdUseCaseRepository.execute(userId);

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
