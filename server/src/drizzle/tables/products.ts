import { pgTable, text, uuid, varchar, pgEnum, decimal, timestamp, check } from 'drizzle-orm/pg-core';
import { UsersTable } from './users.js';
import { sql } from 'drizzle-orm';


export const Collection = pgEnum('collection', ['gaming', 'laptop', 'mobile', 'wearable']);

export const Status = pgEnum('status', ['listed', 'sold']);

export const ProductsTable = pgTable('products', {
    product_id: uuid('product_id').defaultRandom().primaryKey(),
    title: varchar('title', { length: 200 }).notNull(),
    description: text('description').notNull(),
    collection: Collection('collection').notNull(),
    price: decimal('price').default('0').notNull(),
    ipfs_hash: varchar('ipfs_hash', { length: 128 }).notNull(),
    status: Status('status').default('listed').notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
    seller_id: uuid('seller_id').references(() => UsersTable.user_id).notNull()
}, table => {
    return {
        price_check: check('price_check', sql`${table.price} > 0`)
    };
});