import { PostgresHelper } from '../../../db/postgres/client.js';

export class PostgresUpdateTransactionRepositoy {
    async execute(transactionId, updateTransactionParams) {
        const updateFields = [];
        const updateValues = [];

        Object.keys(updateTransactionParams).forEach((key) => {
            updateFields.push(`${key} = $${updateValues.length + 1}`);
            updateValues.push(updateTransactionParams[key]);
        });

        updateValues.push(transactionId);

        const query = `
            UPDATE transactions
            SET ${updateFields.join(', ')}
            WHERE id = $${updateValues.length}
            RETURNING *
        `;

        const updateTransaction = await PostgresHelper.query(
            query,
            updateValues,
        );
        return updateTransaction[0];
    }
}
