import { check, decimal, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { UsersTable } from './users.js';
import { WalletsTable } from './wallets.js';
import { CartsTable } from './carts.js';
import { sql } from 'drizzle-orm';
export const OrdersTable = pgTable('orders', {
    order_id: uuid('order_id').defaultRandom().primaryKey(),
    tx_hash: varchar('tx_hash', { length: 128 }).notNull(),
    nft_receipt_hash: varchar('nft_receipt_hash', { length: 128 }).notNull(),
    total: decimal('total').default('0').notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
    buyer_id: uuid('buyer_id').references(() => UsersTable.user_id).notNull(),
    wallet_id: uuid('wallet_id').references(() => WalletsTable.wallet_id).notNull(),
    cart_id: uuid('cart_id').references(() => CartsTable.cart_id).notNull()
}, table => {
    return {
        total_check: check('total_check', sql `${table.total} > 0`)
    };
});
//# sourceMappingURL=orders.js.map