import { UserNotFoundError } from '../../errors/index.js';

export class UpdateTransactionUseCase {
    constructor(updateTransactionRepositoy, getUserByIdRepository) {
        this.updateTransactionRepositoy = updateTransactionRepositoy;
        this.getUserByIdRepository = getUserByIdRepository;
    }

    async execute(params) {
        const user = await this.getUserByIdRepository.execute(params.userId);

        if (!user) {
            throw new UserNotFoundError();
        }

        const transaction =
            await this.updateTransactionRepositoy.execute(params);

        return transaction;
    }
}
