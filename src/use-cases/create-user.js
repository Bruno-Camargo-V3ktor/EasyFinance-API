import { v4 as uuidv4 } from 'uuid';
import bcrpty from 'bcrypt';
import { PostgresCreateUserRepository } from '../repositories/postgres/create-user.js';

export class CreateUserUseCase {
    async execute(createUserParams) {
        const getUserByEmailRepository = new PostgresCreateUserRepository();
        const userWithEmail = await getUserByEmailRepository.execute(
            createUserParams.email,
        );

        if (userWithEmail) {
            throw new Error('The provided e-mail is already in use.');
        }

        const id = uuidv4();
        const password = await bcrpty.hash(createUserParams.password, 10);

        const user = {
            ...createUserParams,
            id,
            password,
        };

        const postgresCreateUserRepository = new PostgresCreateUserRepository();
        return await postgresCreateUserRepository.execute(user);
    }
}
