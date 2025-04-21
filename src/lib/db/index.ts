import * as schema from './schema';
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

import * as dotenv from 'dotenv';
dotenv.config(); // Load .env file



async function createDbConnection() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });

    return drizzle(connection, { schema, mode: 'default' });
}

// export const db = await createDbConnection();
export const dbPromise = createDbConnection();
