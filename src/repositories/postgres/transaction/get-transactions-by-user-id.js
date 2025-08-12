import { PostgresHelper } from '../../../db/postgres/client.js';

export class PostgresGetTransactionsByUserId {
    async execute(userId) {
        const transactions = await PostgresHelper.query(
            'SELECT * FROM transactions WHERE user_id = $1',
            [userId],
        );

        return transactions;
    }
}
