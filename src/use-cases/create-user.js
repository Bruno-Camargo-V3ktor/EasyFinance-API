import { v4 as uuidv4 } from 'uuid';
import bcrpty from 'bcrypt';
import { EmailAlreadyInUseError } from '../errors/index.js';

export class CreateUserUseCase {
    constructor(createUserRepository, getUserByEmailRepository) {
        this.createUserRepository = createUserRepository;
        this.getUserByEmailRepository = getUserByEmailRepository;
    }

    async execute(createUserParams) {
        const userWithEmail = await this.getUserByEmailRepository.execute(
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

        return await this.createUserRepository.execute(user);
    }
}
