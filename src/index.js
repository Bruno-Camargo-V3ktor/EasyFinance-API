import 'dotenv/config.js';
import express from 'express';
//import { pool } from './db/postgres/client.js';

const app = express();
app.use(express.json());

// eslint-disable-next-line no-undef
app.listen(process.env.SERVER_PORT, () => {
    // eslint-disable-next-line no-undef
    console.log(`Listening on port ${process.env.SERVER_PORT}`);
});
