import 'dotenv/config.js';
import express from 'express';
import {
    makeCreateUserController,
    makeDeleteUserController,
    makeUpdateUserController,
    makeGetUserByIdController,
    makeCreateTransactionController,
    makeUpdateTransactionController,
} from './factories/controllers/index.js';

const app = express();
app.use(express.json());

app.post('/api/users', async (request, response) => {
    const createUserController = makeCreateUserController();

    const { statusCode, body } = await createUserController.execute(request);
    response.status(statusCode).json(body).send();
});

app.post('/api/transactions', async (request, response) => {
    const createTransactionController = makeCreateTransactionController();

    const { statusCode, body } =
        await createTransactionController.execute(request);
    response.status(statusCode).json(body).send();
});

app.get('/api/transactions', async (request, response) => {
    const getTransactionsByUserId = makeGetUserByIdController();

    const { statusCode, body } = await getTransactionsByUserId.execute(request);
    response.status(statusCode).json(body).send();
});

app.get('/api/users/:userId', async (request, response) => {
    const getUserByIdController = makeGetUserByIdController();

    const { statusCode, body } = await getUserByIdController.execute(request);
    response.status(statusCode).json(body).send();
});

app.patch('/api/users/:userId', async (request, response) => {
    const updateUserController = makeUpdateUserController();

    const { statusCode, body } = await updateUserController.execute(request);
    response.status(statusCode).json(body).send();
});

app.patch('/api/transactions/:transactionId', async (request, response) => {
    const updateTransactionController = makeUpdateTransactionController();

    const { statusCode, body } =
        await updateTransactionController.execute(request);
    response.status(statusCode).json(body).send();
});

app.delete('/api/users/:userId', async (request, response) => {
    const deleteUserController = makeDeleteUserController();

    const { statusCode, body } = await deleteUserController.execute(request);
    response.status(statusCode).json(body).send();
});

// eslint-disable-next-line no-undef
app.listen(process.env.SERVER_PORT, () => {
    // eslint-disable-next-line no-undef
    console.log(`Listening on port ${process.env.SERVER_PORT}`);
});
