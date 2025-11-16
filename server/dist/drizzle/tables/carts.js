import { pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';
import { UsersTable } from './users.js';
export const CartsTable = pgTable('carts', {
    cart_id: uuid('cart_id').defaultRandom().primaryKey(),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
    user_id: uuid('user_id').references(() => UsersTable.user_id).notNull()
});
//# sourceMappingURL=carts.js.map