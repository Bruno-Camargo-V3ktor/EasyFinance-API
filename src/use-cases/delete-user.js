import {
    checkIfIdIsValid,
    invalidUserIdResponse,
} from '../controllers/helpers/index.js';
import { PostgresDeleteUserRepository } from '../repositories/postgres/index.js';

export class DeleteUserUseCase {
    async execute(userId) {
        if (checkIfIdIsValid(userId)) {
            return invalidUserIdResponse();
        }

        const deleteUserRepository = new PostgresDeleteUserRepository();
        const deletedUser = await deleteUserRepository.execute(userId);

        return deletedUser;
    }
}
