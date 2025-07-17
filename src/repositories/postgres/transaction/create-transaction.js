import { PostgresHelper } from '../../../db/postgres/client.js';

export class PostgresCreateTransactionRepository {
    async execute(createTransactionParams) {
        let res = await PostgresHelper.query(
            `INSERT INTO transactions (id, user_id, name, date, amount, type) 
             VALUES ($1, $2, $3, $4, $5, $6) 
             RETURNING *
            `,
            [
                createTransactionParams.id,
                createTransactionParams.user_id,
                createTransactionParams.name,
                createTransactionParams.date,
                createTransactionParams.amount,
                createTransactionParams.type,
            ],
        );

        const createdTransaction = res[0];
        return createdTransaction;
    }
}
