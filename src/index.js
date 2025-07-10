import 'dotenv/config.js';
import express from 'express';
import { CreateUserController } from './controllers/create-user.js';
import { GetUserByIdController } from './controllers/get-user-by-id.js';
//import { pool } from './db/postgres/client.js';

const app = express();
app.use(express.json());

app.post('/api/users', async (request, response) => {
    const createUserController = new CreateUserController();
    const { statusCode, body } = await createUserController.execute(request);

    response.status(statusCode).json(body).send();
});

app.get('/api/users/:userId', async (request, response) => {
    const getUserByIdController = new GetUserByIdController();
    const { statusCode, body } = await getUserByIdController.execute(request);

    response.status(statusCode).json(body).send();
});

// eslint-disable-next-line no-undef
app.listen(process.env.SERVER_PORT, () => {
    // eslint-disable-next-line no-undef
    console.log(`Listening on port ${process.env.SERVER_PORT}`);
});
