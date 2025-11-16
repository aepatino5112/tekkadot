import { pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';

export const UsersTable = pgTable('users', {
    user_id: uuid('user_id').primaryKey().defaultRandom(),
    created_at: timestamp('created_at').defaultNow().notNull()
});