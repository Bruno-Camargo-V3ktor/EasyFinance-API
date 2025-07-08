import 'dotenv/config.js';
import express from 'express';
import { pool } from './db/postgres/client.js';


const app = express();


app.get('/', async (req, res) => {
    const client = await pool.connect();

    const results = await client.query('SELECT * FROM users;')

    res.send( JSON.stringify(results.rows) );
});


app.listen(3000, () => { console.log('Listening on port 3000') });