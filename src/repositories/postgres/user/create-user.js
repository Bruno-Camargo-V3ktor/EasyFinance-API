import prisma from '../../../../prisma/prisma.js';

export class PostgresCreateUserRepository {
    async execute(createUserParams) {
        const user = await prisma.user.create({
            data: {
                id: createUserParams.id,
                email: createUserParams.email,
                fisrt_name: createUserParams.firstName,
                last_name: createUserParams.lastName,
                password: createUserParams.password,
            },
        });

        return user;
    }
}
