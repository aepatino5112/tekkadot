import { sql } from 'drizzle-orm';
import { pgTable, text, uuid, varchar, pgEnum, decimal, timestamp, check } from 'drizzle-orm/pg-core';
import { UsersTable } from './users.js';
export const Category = pgEnum('category', ['art', 'collectible', 'music', 'fresh', 'cyberpunk']);
export const Rareness = pgEnum('rareness', ['common', 'rare', 'epic', 'legendary']);
export const Status = pgEnum('status', ['listed', 'sold']);
export const NFTsTable = pgTable('nfts', {
    nft_id: uuid('nft_id').defaultRandom().primaryKey(),
    title: varchar('title', { length: 200 }).notNull(),
    description: text('description').notNull(),
    category: Category('category').notNull(),
    rareness: Rareness('rareness').notNull(),
    price: decimal('price').default('0').notNull(),
    ipfs_hash: varchar('ipfs_hash', { length: 128 }).notNull(),
    status: Status('status').default('listed').notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
    creator_id: uuid('creator_id').references(() => UsersTable.user_id).notNull()
}, table => {
    return {
        price_check: check('price_check', sql `${table.price} > 0`)
    };
});
//# sourceMappingURL=nfts.js.map