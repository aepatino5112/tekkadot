import { pgTable, uuid, pgEnum, text, timestamp } from 'drizzle-orm/pg-core';
import { UsersTable } from './users.js';
// Enum for the wallets options
export const WalletType = pgEnum('wallet_type', ['talisman', 'polkadotjs', 'subwallet']);
export const WalletsTable = pgTable('wallets', {
    wallet_id: uuid('wallet_id').primaryKey().defaultRandom(),
    wallet_type: WalletType('wallet_type').notNull(),
    wallet_address: text('wallet_address').unique().notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
    user_id: uuid('user_id').references(() => UsersTable.user_id).notNull()
});
//# sourceMappingURL=wallets.js.map