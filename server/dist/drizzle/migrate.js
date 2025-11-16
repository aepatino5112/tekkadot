import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import dotenv from 'dotenv';
// Load environment variables
dotenv.config();
const { POSTGRES_USERNAME, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_HOST, POSTGRES_PORT } = process.env;
// New PostgreSQL pool
const pool = new Pool({
    connectionString: `postgresql://${POSTGRES_USERNAME}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`,
    max: 1
});
// Migration function
async function main() {
    await migrate(drizzle(pool), {
        migrationsFolder: 'src/drizzle/migrations'
    });
    await pool.end();
}
main();
//# sourceMappingURL=migrate.js.map