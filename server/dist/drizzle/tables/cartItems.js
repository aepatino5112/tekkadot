import { integer, pgTable, timestamp, uuid, check } from 'drizzle-orm/pg-core';
import { CartsTable } from './carts.js';
import { ProductsTable } from './products.js';
import { NFTsTable } from './nfts.js';
import { sql } from 'drizzle-orm';
export const CartItemsTable = pgTable('cart_items', {
    cart_item_id: uuid('cart_item_id').defaultRandom().primaryKey(),
    quantity: integer('quantity').default(1).notNull(),
    added_at: timestamp('added_at').notNull(),
    cart_id: uuid('cart_id').references(() => CartsTable.cart_id).notNull(),
    product_id: uuid('product_id').references(() => ProductsTable.product_id),
    nft_id: uuid('nft_id').references(() => NFTsTable.nft_id)
}, table => {
    return {
        quantity_check: check('quantity_check', sql `${table.quantity} >= 1`)
    };
});
//# sourceMappingURL=cartItems.js.map