import { EmailAlreadyInUseError } from '../../errors/user.js';
import bcrpty from 'bcrypt';

export class UpdateUserUseCase {
    constructor(updateUserRepository, getUserByEmailRepository) {
        this.updateUserRepository = updateUserRepository;
        this.getUserByEmailRepository = getUserByEmailRepository;
    }

    async execute(userId, updateUserParams) {
        if (updateUserParams.email) {
            const userWithEmail = await this.getUserByEmailRepository(
                updateUserParams.email,
            );

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

        const updateUser = await this.updateUserRepository.execute(
            userId,
            updateUserParams,
        );

        return updateUser;
    }
}
