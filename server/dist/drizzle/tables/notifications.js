import { pgTable, uuid, pgEnum, text, timestamp } from 'drizzle-orm/pg-core';
import { WalletsTable } from './wallets.js';
export const Type = pgEnum('type', ['promotion', 'order_update', 'newsletter']);
export const Status = pgEnum('status', ['pending', 'delivered']);
export const NotificationsTable = pgTable('notifications', {
    notification_id: uuid('notification_id').defaultRandom().primaryKey(),
    type: Type('type').notNull(),
    content: text().notNull(),
    sent_at: timestamp('sent_at').notNull(),
    status: Status('status').notNull(),
    wallet_id: uuid('wallet_id').references(() => WalletsTable.wallet_id).notNull()
});
//# sourceMappingURL=notifications.js.map