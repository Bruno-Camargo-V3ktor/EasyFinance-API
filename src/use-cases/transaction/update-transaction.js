export class UpdateTransactionUseCase {
    constructor(updateTransactionRepositoy) {
        this.updateTransactionRepositoy = updateTransactionRepositoy;
    }

    async execute(transactionId, params) {
        const transaction = await this.updateTransactionRepositoy.execute(
            transactionId,
            params,
        );

        return transaction;
    }
}
