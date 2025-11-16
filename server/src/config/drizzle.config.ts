import { defineConfig } from 'drizzle-kit';
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


// Drizzle configuration
export default defineConfig({
    schema: 'src/drizzle/tables/*.ts',
    out: 'src/drizzle/migrations',
    dialect: 'postgresql',
    dbCredentials: {
        url: `postgresql://${POSTGRES_USERNAME}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`
    }
});