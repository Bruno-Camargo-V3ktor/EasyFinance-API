import { PostgresHelper } from '../../db/postgres/client.js';

export class PostgresUpdateUserRepository {
    async execute(userId, updateUserParams) {
        const updateFields = [];
        const updateValues = [];

        Object.keys(updateUserParams).forEach((key) => {
            updateFields.push(`${key} = ${updateValues.length + 1}`);
            updateValues.push(updateUserParams[key]);
        });

        updateValues.push(userId);

        const query = `
            UPDATE users
            SET ${updateFields.join(', ')}
            WHERE id = ${updateValues.length}
            RETURNING *
        `;

        const updateUser = await PostgresHelper.query(query, updateValues);
        return updateUser[0];
    }
}
