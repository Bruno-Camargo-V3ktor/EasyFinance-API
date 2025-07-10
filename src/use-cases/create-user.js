import { v4 as uuidv4 } from 'uuid';
import bcrpty from 'bcrypt';
import { PostgresCreateUserRepository } from '../repositories/postgres/create-user.js';

export class CreateUserUseCase {
    async execute(createUserParams) {
        const id = uuidv4();
        const password = bcrpty.hash(createUserParams.password, 10);

        const user = {
            ...createUserParams,
            id,
            password,
        };

        const postgresCreateUserRepository = new PostgresCreateUserRepository();
        return await postgresCreateUserRepository.execute(user);
    }
}
