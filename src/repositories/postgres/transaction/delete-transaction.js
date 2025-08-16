import { PostgresHelper } from '../../../db/postgres/client.js';

export class PostgresDeleteTransaction {
    async execute(transactionId) {
        const transaction = await PostgresHelper.query(
            'DELETE FROM transactions WHERE id = $1 RETURNINH *',
            [transactionId],
        );

        return transaction[0];
    }
}
