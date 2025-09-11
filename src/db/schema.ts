import {
    pgTable,
    text,
    timestamp,
    integer,
    boolean,
    primaryKey,
    uuid,
    pgEnum,
    uniqueIndex,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import type { AdapterAccount } from '@auth/core/adapters';

export const userRoleEnum = pgEnum('user_role', ['ADMIN', 'USER']);
export const postTypeEnum = pgEnum('post_type', [
    'news',
    'events',
    'community',
]);

export const users = pgTable('user', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    name: text('name'),
    email: text('email').notNull().unique(),
    emailVerified: timestamp('emailVerified', { mode: 'date' }),
    image: text('image'),
    password: text('password'),
    phone: text('phone'),
    phoneVerified: timestamp('phoneVerified', { mode: 'date' }),
    dateOfBirth: timestamp('dateOfBirth', { mode: 'date' }),
    gender: text('gender'),
    role: userRoleEnum('role').default('USER').notNull(),
});

export const userProfiles = pgTable(
    'user_profile',
    {
        id: uuid('id').defaultRandom().primaryKey().notNull(),
        userId: uuid('userId')
            .notNull()
            .references(() => users.id, { onDelete: 'cascade' }),
        firstName: text('firstName').notNull(),
        lastName: text('lastName').notNull(),
        dateOfBirth: text('dateOfBirth'),
        email: text('email').notNull(),
        phoneNumber: text('phoneNumber').notNull(),
        socialNetwork: text('socialNetwork'),
        contactMethods: text('contactMethods').array(),
        message: text('message'),
        createdAt: timestamp('createdAt', { mode: 'date' })
            .defaultNow()
            .notNull(),
        updatedAt: timestamp('updatedAt', { mode: 'date' })
            .defaultNow()
            .notNull(),
    },
    table => {
        return {
            // Ensure one profile per user
            userIdUnique: uniqueIndex('user_profile_user_id_unique').on(
                table.userId
            ),
        };
    }
);

export const accounts = pgTable(
    'account',
    {
        userId: uuid('userId')
            .notNull()
            .references(() => users.id, { onDelete: 'cascade' }),
        type: text('type').$type<AdapterAccount['type']>().notNull(),
        provider: text('provider').notNull(),
        providerAccountId: text('providerAccountId').notNull(),
        refresh_token: text('refresh_token'),
        access_token: text('access_token'),
        expires_at: integer('expires_at'),
        token_type: text('token_type'),
        scope: text('scope'),
        id_token: text('id_token'),
        session_state: text('session_state'),
    },
    account => [
        primaryKey({
            columns: [account.provider, account.providerAccountId],
        }),
    ]
);

export const sessions = pgTable('sessions', {
    sessionToken: text('sessionToken').primaryKey(),
    userId: uuid('userId')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
});

export const verificationTokens = pgTable(
    'verificationTokens',
    {
        identifier: text('identifier').notNull(),
        token: text('token').notNull(),
        expires: timestamp('expires', { mode: 'date' }).notNull(),
    },
    vt => [primaryKey({ columns: [vt.identifier, vt.token] })]
);

export const otpCodes = pgTable('otpCodes', {
    id: text('id').primaryKey().notNull(),
    userId: uuid('userId')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    code: text('code').notNull(),
    type: text('type').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
    verified: boolean('verified').notNull().default(false),
    createdAt: timestamp('createdAt', { mode: 'date' }).notNull().defaultNow(),
});

export const products = pgTable('product', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    name: text('name').notNull(),
    description: text('description'),
    price: integer('price').notNull(),
    stock: integer('stock'),
    imageUrl: text('imageUrl'),
    createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow().notNull(),
});

export const carts = pgTable('cart', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    userId: uuid('userId')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    isCheckedOut: boolean('isCheckedOut').default(false).notNull(),
    createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updatedAt', { mode: 'date' }).defaultNow().notNull(),
});

export const cartItems = pgTable(
    'cart_item',
    {
        cartId: uuid('cartId')
            .notNull()
            .references(() => carts.id, { onDelete: 'cascade' }),
        productId: uuid('productId')
            .notNull()
            .references(() => products.id, { onDelete: 'cascade' }),
        quantity: integer('quantity').notNull().default(1),
    },
    table => [primaryKey({ columns: [table.cartId, table.productId] })]
);

export const transactions = pgTable('transaction', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    cartId: uuid('cartId')
        .notNull()
        .references(() => carts.id, { onDelete: 'cascade' }),
    userId: uuid('userId')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    // New columns for user information
    firstName: text('firstName').notNull(),
    lastName: text('lastName').notNull(),
    dateOfBirth: timestamp('dateOfBirth', { mode: 'date' }),
    email: text('email').notNull(),
    phoneNumber: text('phoneNumber').notNull(),
    socialNetwork: text('socialNetwork'),
    contactMethods: text('contactMethods').array().notNull(), // Store as text array
    message: text('message'),
    totalAmount: integer('totalAmount').notNull(),
    status: text('status')
        .$type<'pending' | 'completed' | 'cancelled' | 'failed'>()
        .notNull(),
    createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updatedAt', { mode: 'date' }).defaultNow().notNull(),
});

export const transactionItems = pgTable('transaction_item', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    transactionId: uuid('transactionId')
        .notNull()
        .references(() => transactions.id, { onDelete: 'cascade' }),
    productId: uuid('productId')
        .notNull()
        .references(() => products.id, { onDelete: 'cascade' }),
    quantity: integer('quantity').notNull(),
    price: integer('price').notNull(),
});

export const posts = pgTable('post', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    title: text('title').notNull(),
    slug: text('slug').notNull().unique(),
    description: text('description').notNull(),
    content: text('content').notNull(),
    userId: uuid('userId')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    likes: integer('likes').default(0).notNull(),
    dislikes: integer('dislikes').default(0).notNull(),
    views: integer('views').default(0).notNull(),
    referenceSource: text('referenceSource').notNull(),
    type: postTypeEnum('type').notNull(),
    readingTime: integer('readingTime').notNull().default(1),
    createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow().notNull(),

    // SEO Metadata Fields
    seoTitle: text('seoTitle'), // Custom title for SEO
    seoDescription: text('seoDescription'), // Meta description
    seoKeywords: text('seoKeywords').array(), // Array of keywords
    ogImage: text('ogImage'), // Image for social sharing
    canonicalUrl: text('canonicalUrl'), // Preferred URL
    robots: text('robots'), // e.g., "index, follow"
});

export const postTags = pgTable(
    'post_tag',
    {
        postId: uuid('postId')
            .notNull()
            .references(() => posts.id, { onDelete: 'cascade' }),
        tagId: uuid('tagId')
            .notNull()
            .references(() => tags.id, { onDelete: 'cascade' }),
    },
    table => ({
        pk: primaryKey({ columns: [table.postId, table.tagId] }),
    })
);

export const tags = pgTable('tag', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    name: text('name').notNull().unique(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
    accounts: many(accounts),
    sessions: many(sessions),
    otpCodes: many(otpCodes),
    carts: many(carts),
    transactions: many(transactions),
    posts: many(posts),
}));

export const userProfileRelations = relations(userProfiles, ({ one }) => ({
    user: one(users, { fields: [userProfiles.userId], references: [users.id] }),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
    user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
    user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const otpCodesRelations = relations(otpCodes, ({ one }) => ({
    user: one(users, { fields: [otpCodes.userId], references: [users.id] }),
}));

export const productRelations = relations(products, ({ many }) => ({
    cartItems: many(cartItems),
}));

export const cartRelations = relations(carts, ({ one, many }) => ({
    user: one(users, { fields: [carts.userId], references: [users.id] }),
    items: many(cartItems),
    transactions: many(transactions),
}));

export const cartItemRelations = relations(cartItems, ({ one }) => ({
    cart: one(carts, { fields: [cartItems.cartId], references: [carts.id] }),
    product: one(products, {
        fields: [cartItems.productId],
        references: [products.id],
    }),
}));

export const transactionRelations = relations(
    transactions,
    ({ one, many }) => ({
        user: one(users, {
            fields: [transactions.userId],
            references: [users.id],
        }),
        cart: one(carts, {
            fields: [transactions.cartId],
            references: [carts.id],
        }),
        items: many(transactionItems),
    })
);

export const transactionItemRelations = relations(
    transactionItems,
    ({ one }) => ({
        transaction: one(transactions, {
            fields: [transactionItems.transactionId],
            references: [transactions.id],
        }),
        product: one(products, {
            fields: [transactionItems.productId],
            references: [products.id],
        }),
    })
);

export const postsRelations = relations(posts, ({ one, many }) => ({
    user: one(users, { fields: [posts.userId], references: [users.id] }),
    postTags: many(postTags),
}));

export const tagRelations = relations(tags, ({ many }) => ({
    postTags: many(postTags),
}));

export const postTagRelations = relations(postTags, ({ one }) => ({
    post: one(posts, {
        fields: [postTags.postId],
        references: [posts.id],
    }),
    tag: one(tags, {
        fields: [postTags.tagId],
        references: [tags.id],
    }),
}));

// Types
export type User = typeof users.$inferSelect;
export type UserProfile = typeof userProfiles.$inferSelect;
export type Account = typeof accounts.$inferSelect;
export type Session = typeof sessions.$inferSelect;
export type VerificationToken = typeof verificationTokens.$inferSelect;
export type OtpCode = typeof otpCodes.$inferSelect;
export type Product = typeof products.$inferSelect;
export type Cart = typeof carts.$inferSelect;
export type CartItem = typeof cartItems.$inferSelect;
export type Transaction = typeof transactions.$inferSelect;
export type TransactionItem = typeof transactionItems.$inferSelect;
export type Post = typeof posts.$inferSelect;
export type Tag = typeof tags.$inferSelect;
export type PostTag = typeof postTags.$inferSelect;

export type NewUser = typeof users.$inferInsert;
export type NewUserProfile = typeof userProfiles.$inferInsert;
export type NewAccount = typeof accounts.$inferInsert;
export type NewSession = typeof sessions.$inferInsert;
export type NewVerificationToken = typeof verificationTokens.$inferInsert;
export type NewOtpCode = typeof otpCodes.$inferInsert;
export type NewProduct = typeof products.$inferInsert;
export type NewCart = typeof carts.$inferInsert;
export type NewCartItem = typeof cartItems.$inferInsert;
export type NewTransaction = typeof transactions.$inferInsert;
export type NewTransactionItem = typeof transactionItems.$inferInsert;
export type NewPost = typeof posts.$inferInsert;
export type NewTag = typeof tags.$inferInsert;
export type NewPostTag = typeof postTags.$inferInsert;
