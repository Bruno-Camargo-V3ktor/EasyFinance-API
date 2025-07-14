import { v4 as uuidv4 } from 'uuid';
import bcrpty from 'bcrypt';
import { PostgresCreateUserRepository } from '../repositories/postgres/create-user.js';
import { EmailAlreadyInUseError } from '../errors/user.js';
import { GetUserByEmailRepository } from '../repositories/postgres/get-user-by-email.js';

export class CreateUserUseCase {
    async execute(createUserParams) {
        const getUserByEmailRepository = new GetUserByEmailRepository();
        const userWithEmail = await getUserByEmailRepository.execute(
            createUserParams.email,
        );

        if (userWithEmail) {
            throw new EmailAlreadyInUseError(createUserParams.email);
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
