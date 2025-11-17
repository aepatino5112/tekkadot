import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { UsersTable } from './users.js';
import { ProductsTable } from './products.js';
import { NFTsTable } from './nfts.js';
export const MessagesTable = pgTable('messages', {
    message_id: uuid('message_id').defaultRandom().primaryKey(),
    content_hash: varchar('content_hash', { length: 128 }).notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
    sender_id: uuid('sender_id').references(() => UsersTable.user_id).notNull(),
    receiver_id: uuid('receiver_id').references(() => UsersTable.user_id).notNull(),
    product_id: uuid('product_id').references(() => ProductsTable.product_id),
    nft_id: uuid('nft_id').references(() => NFTsTable.nft_id)
});
//# sourceMappingURL=messages.js.map