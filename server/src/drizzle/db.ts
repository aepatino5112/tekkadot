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

dotenv.config();

const {
    POSTGRES_USERNAME,
    POSTGRES_PASSWORD,
    POSTGRES_DB,
    POSTGRES_HOST,
    POSTGRES_PORT,
} = process.env;

declare global {
  var _pool: Pool | undefined;
}

const connectionString = `postgres://${POSTGRES_USERNAME}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`;

const pool = global._pool ?? new Pool({ connectionString });
if (!global._pool) global._pool = pool;

// Create database client
export const db = drizzle(pool, { schema: { UsersTable, WalletsTable, CartsTable, CartItemsTable, MessagesTable, NFTsTable, NotificationsTable, OrdersTable, ProductsTable } });