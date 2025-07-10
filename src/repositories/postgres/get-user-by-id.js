import { PostgresHelper } from '../../db/postgres/client.js';

export class PostgresGetUserByIdRepository {
    async execute(userId) {
        const user = await PostgresHelper.query(
            'SELECT * FROM USERS WHERE ID = $1',
            [userId],
        );

        return user[0];
    }
}
