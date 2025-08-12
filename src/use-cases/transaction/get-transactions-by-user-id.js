import { UserNotFoundError } from '../../errors';

export class GetTransactionsByUserIdUseCase {
    constructor(getTransactionsByUserIdRepository, getUserByIdRepository) {
        this.getTransactionsByUserIdRepository =
            getTransactionsByUserIdRepository;
        this.getUserByIdRepository = getUserByIdRepository;
    }

    async execute(params) {
        const user = await this.getUserByIdRepository.execute(params.userId);
        if (!user) {
            throw UserNotFoundError(params.userId);
        }

        const transactions = await this.getTransactionsByUserIdRepository(
            params.userId,
        );

        return transactions;
    }
}
