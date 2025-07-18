import { v4 as uuidv4 } from 'uuid';
import { UserNotFoundError } from '../../errors/index.js';

export class CreateTransactionUseCase {
    constructor(createTransactionRepository, getUserByIdRepository) {
        this.createTransactionRepository = createTransactionRepository;
        this.getUserByIdRepository = getUserByIdRepository;
    }

    async execute(createTransactionParams) {
        const userId = createTransactionParams.user_id;
        const user = await this.getUserByIdRepository.execute(userId);
        if (!user) {
            throw new UserNotFoundError(userId);
        }

        createTransactionParams.id = uuidv4();

        const transaction = await this.createTransactionRepository.execute(
            createTransactionParams,
        );
        return transaction;
    }
}
