import { drizzle } from 'drizzle-orm/node-postgres';
import { UsersTable } from './tables/users.js';
import { Pool } from 'pg';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const { 
    POSTGRES_USERNAME, 
    POSTGRES_PASSWORD, 
    POSTGRES_DB,
    POSTGRES_HOST,
    POSTGRES_PORT
} = process.env;

// New PostgreSQL pool
const client = new Pool({
    connectionString: `postgresql://${POSTGRES_USERNAME}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`
});

// Create database client
export const db = drizzle(client, { schema: { UsersTable } });