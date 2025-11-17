import { drizzle } from 'drizzle-orm/node-postgres';
import { UsersTable } from './tables/users.js';
import { WalletsTable } from './tables/wallets.js';
import { CartsTable } from './tables/carts.js';
import { CartItemsTable } from './tables/cartItems.js';
import { MessagesTable } from './tables/messages.js';
import { NFTsTable } from './tables/nfts.js';
import { NotificationsTable } from './tables/notifications.js';
import { OrdersTable } from './tables/orders.js';
import { ProductsTable } from './tables/products.js';
import { Pool } from 'pg';
import dotenv from 'dotenv';
// Load environment variables
dotenv.config();
const { POSTGRES_USERNAME, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_HOST, POSTGRES_PORT } = process.env;
// New PostgreSQL pool
const client = new Pool({
    connectionString: `postgres://${POSTGRES_USERNAME}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`
});
// Create database client
export const db = drizzle(client, { schema: { UsersTable, WalletsTable, CartsTable, CartItemsTable, MessagesTable, NFTsTable, NotificationsTable, OrdersTable, ProductsTable } });
//# sourceMappingURL=db.js.map