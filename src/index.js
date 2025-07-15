import 'dotenv/config.js';
import express from 'express';
import {
    CreateUserController,
    DeleteUserController,
    GetUserByIdController,
    UpdateUserController,
} from './controllers/index.js';
import {
    PostgresCreateUserRepository,
    PostgresGetUserByEmailRepository,
    PostgresGetUserByIdRepository,
} from './repositories/postgres/index.js';
import { CreateUserUseCase, GetUserByIdUseCase } from './use-cases/index.js';

const app = express();
app.use(express.json());

app.post('/api/users', async (request, response) => {
    const createUserRepository = new PostgresCreateUserRepository();
    const getUserByEmailRepository = new PostgresGetUserByEmailRepository();

    const createUserUseCase = new CreateUserUseCase(
        createUserRepository,
        getUserByEmailRepository,
    );

    const createUserController = new CreateUserController(createUserUseCase);

    const { statusCode, body } = await createUserController.execute(request);
    response.status(statusCode).json(body).send();
});

app.get('/api/users/:userId', async (request, response) => {
    const getUserByIdRepository = new PostgresGetUserByIdRepository();

    const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository);

    const getUserByIdController = new GetUserByIdController(getUserByIdUseCase);

    const { statusCode, body } = await getUserByIdController.execute(request);
    response.status(statusCode).json(body).send();
});

app.patch('/api/users/:userId', async (request, response) => {
    const updateUserController = new UpdateUserController();
    const { statusCode, body } = await updateUserController.execute(request);

    response.status(statusCode).json(body).send();
});

app.delete('/api/users/:userId', async (request, response) => {
    const deleteUserController = new DeleteUserController();
    const { statusCode, body } = await deleteUserController.execute(request);

    response.status(statusCode).json(body).send();
});

// eslint-disable-next-line no-undef
app.listen(process.env.SERVER_PORT, () => {
    // eslint-disable-next-line no-undef
    console.log(`Listening on port ${process.env.SERVER_PORT}`);
});
