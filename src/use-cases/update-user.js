import { EmailAlreadyInUseError } from '../errors/user.js';
import { PostgresGetUserByEmailRepository } from '../repositories/postgres/get-user-by-email.js';
import bcrpty from 'bcrypt';
import { PostgresUpdateUserRepository } from '../repositories/postgres/update-user.js';

export class UpdateUserUseCase {
    async execute(userId, updateUserParams) {
        if (updateUserParams.email) {
            const getUserByEmail = new PostgresGetUserByEmailRepository();
            const userWithEmail = await getUserByEmail(updateUserParams.email);

            if (userWithEmail && userWithEmail.id !== userId) {
                throw new EmailAlreadyInUseError(updateUserParams.email);
            }
        }

        if (updateUserParams.password) {
            updateUserParams.password = await bcrpty.hash(
                updateUserParams.password,
                10,
            );
        }

        const updateUserRepository = new PostgresUpdateUserRepository();
        const updateUser = await updateUserRepository.execute(
            userId,
            updateUserParams,
        );

        return updateUser;
    }
}
