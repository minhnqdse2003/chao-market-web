import { relations } from 'drizzle-orm';
import {
    pgTable,
    unique,
    uuid,
    text,
    timestamp,
    foreignKey,
    boolean,
    uniqueIndex,
    jsonb,
    index,
    integer,
    primaryKey,
    pgEnum,
    numeric,
} from 'drizzle-orm/pg-core';

export const postStatus = pgEnum('post_status', ['ACTIVE', 'DEACTIVE']);
export const postType = pgEnum('post_type', ['insight', 'community']);
export const tagTypes = pgEnum('tag_types', [
    'tag',
    'news_type',
    'market_type',
    'community_type',
    'product_type',
]);
export const userRole = pgEnum('user_role', ['ADMIN', 'USER']);
export const userStatus = pgEnum('user_status', [
    'ACTIVE',
    'DEACTIVE',
    'BANNED',
]);
export const userInteractionsType = pgEnum('user_interactions_type', [
    'LIKE',
    'DISLIKE',
]);

export const transactionStatus = pgEnum('transaction_status', [
    'PENDING',
    'COMPLETED',
    'FAILED',
    'REFUNDED',
]);

export const users = pgTable(
    'user',
    {
        id: uuid().defaultRandom().primaryKey().notNull(),
        name: text(),
        email: text().notNull(),
        emailVerified: timestamp({ mode: 'string' }),
        image: text(),
        password: text(),
        phone: text(),
        phoneVerified: timestamp({ mode: 'string' }),
        role: userRole().default('USER').notNull(),
        dateOfBirth: timestamp({ mode: 'string' }),
        gender: text(),
        status: userStatus().default('ACTIVE'),
        createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
        updatedAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
        banUntil: timestamp({ mode: 'string' }),
    },
    table => [unique('user_email_unique').on(table.email)]
);

export const consultations = pgTable('consultation', {
    id: uuid().defaultRandom().primaryKey().notNull(),
    firstName: text().notNull(),
    lastName: text().notNull(),
    dateOfBirth: timestamp({ mode: 'string' }),
    email: text().notNull(),
    phoneNumber: text().notNull(),
    socialNetwork: text(),
    contactMethods: text().array().notNull(),
    message: text(),
    status: text().notNull(),
    createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
    updatedAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
});

export const consultationServices = pgTable('consultation_services', {
    id: uuid().defaultRandom().primaryKey().notNull(),
    name: jsonb().notNull(), // i18n support
    marketType: text(),
    resource: text(),
    shortDescription: jsonb(),
    description: jsonb(),
    guideInstruction: jsonb(),
    driveLink: text(),
    views: integer().default(0).notNull(),
    price: numeric('price', { precision: 19, scale: 4 }).notNull().default('0'),
    discountPrice: numeric('discount_price', { precision: 19, scale: 4 }),
    isDiscountPriceVisible: boolean().default(false).notNull(),
    imageUrl: text(),
    instructorId: uuid().references(() => instructors.id, {
        onDelete: 'set null',
    }),
    type: text().notNull().default('Holistic'),
    createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
});

export const transactions = pgTable('transaction', {
    id: uuid().defaultRandom().primaryKey().notNull(),
    consultationId: uuid()
        .notNull()
        .references(() => consultations.id, { onDelete: 'cascade' }),
    userId: uuid().references(() => users.id, { onDelete: 'set null' }),
    amount: numeric('amount', { precision: 19, scale: 4 }).notNull(),
    currency: text().default('VND').notNull(),
    status: transactionStatus().default('PENDING').notNull(),
    paymentGateway: text(),
    gatewayTransactionId: text(),
    accessGrantedAt: timestamp({ mode: 'string' }),
    accessError: text(),
    createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
    updatedAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
});

export const otpCodes = pgTable(
    'otpCodes',
    {
        id: text().primaryKey().notNull(),
        userId: uuid().notNull(),
        code: text().notNull(),
        type: text().notNull(),
        expires: timestamp({ mode: 'string' }).notNull(),
        verified: boolean().default(false).notNull(),
        createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
    },
    table => [
        foreignKey({
            columns: [table.userId],
            foreignColumns: [users.id],
            name: 'otpCodes_userId_user_id_fk',
        }).onDelete('cascade'),
    ]
);

export const sessions = pgTable(
    'sessions',
    {
        sessionToken: text().primaryKey().notNull(),
        userId: uuid().notNull(),
        expires: timestamp({ mode: 'string' }).notNull(),
    },
    table => [
        foreignKey({
            columns: [table.userId],
            foreignColumns: [users.id],
            name: 'sessions_userId_user_id_fk',
        }).onDelete('cascade'),
    ]
);

export const userProfiles = pgTable(
    'user_profile',
    {
        id: uuid().defaultRandom().primaryKey().notNull(),
        userId: uuid().notNull(),
        firstName: text().notNull(),
        lastName: text().notNull(),
        dateOfBirth: text(),
        email: text().notNull(),
        phoneNumber: text().notNull(),
        socialNetwork: text(),
        contactMethods: text().array(),
        message: text(),
        createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
        updatedAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
    },
    table => [
        uniqueIndex('user_profile_user_id_unique').using(
            'btree',
            table.userId.asc().nullsLast().op('uuid_ops')
        ),
        foreignKey({
            columns: [table.userId],
            foreignColumns: [users.id],
            name: 'user_profile_userId_user_id_fk',
        }).onDelete('cascade'),
    ]
);

export const userSetting = pgTable(
    'user_setting',
    {
        id: uuid().defaultRandom().primaryKey().notNull(),
        userId: uuid().notNull(),
        settings: jsonb().default({ theme: 'dark', language: 'en' }).notNull(),
        isDisclaimerAccepted: timestamp({ mode: 'string' }),
    },
    table => [
        foreignKey({
            columns: [table.userId],
            foreignColumns: [users.id],
            name: 'user_setting_userId_user_id_fk',
        }).onDelete('cascade'),
        unique('user_setting_userId_unique').on(table.userId),
    ]
);

export const tags = pgTable(
    'tag',
    {
        id: uuid().defaultRandom().primaryKey().notNull(),
        name: text().notNull(),
        tagType: tagTypes('tag_type'),
    },
    table => [
        index('tag_type_idx').using(
            'btree',
            table.tagType.asc().nullsLast().op('enum_ops')
        ),
        unique('tag_name_unique').on(table.name),
    ]
);

export const posts = pgTable(
    'post',
    {
        id: uuid().defaultRandom().primaryKey().notNull(),
        content: jsonb().default({ en: null, vi: null }).notNull(),
        likes: integer().default(0).notNull(),
        dislikes: integer().default(0).notNull(),
        views: integer().default(0).notNull(),
        referenceSource: text().notNull(),
        createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
        title: jsonb().default({ en: null, vi: null }).notNull(),
        description: jsonb().default({ en: null, vi: null }).notNull(),
        type: postType().notNull(),
        slug: text().notNull(),
        readingTime: integer().default(1).notNull(),
        seoTitle: text(),
        seoDescription: text(),
        seoKeywords: text().array(),
        ogImage: text(),
        canonicalUrl: text(),
        robots: text(),
        market: text().default('all').notNull(),
        status: postStatus().default('ACTIVE'),
        imageUrl: text(),
    },
    table => [unique('post_slug_unique').on(table.slug)]
);

export const userInteractions = pgTable(
    'post_interactions',
    {
        id: uuid().defaultRandom().primaryKey().notNull(),
        userId: uuid(),
        guestIdentifier: text('guest_identifier'),
        postId: uuid().notNull(),
        type: userInteractionsType().notNull(),
        createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
    },
    table => [
        foreignKey({
            columns: [table.postId],
            foreignColumns: [posts.id],
            name: 'user_interactions_postId_post_id_fk',
        }),
        foreignKey({
            columns: [table.userId],
            foreignColumns: [users.id],
            name: 'user_interactions_userId_user_id_fk',
        }),
        uniqueIndex('unique_user_post_type').on(
            table.userId,
            table.postId,
            table.type
        ),
        uniqueIndex('unique_guest_post_type').on(
            table.guestIdentifier,
            table.postId,
            table.type
        ),
    ]
);

export const metaData = pgTable(
    'meta_data',
    {
        version: integer().default(1).notNull(),
        content: jsonb().default({}).notNull(),
        isPublished: boolean('is_published').default(false).notNull(),
        createdAt: timestamp('created_at', {
            withTimezone: true,
            mode: 'string',
        })
            .defaultNow()
            .notNull(),
    },
    table => [
        index('idx_content_gin').using(
            'gin',
            table.content.asc().nullsLast().op('jsonb_ops')
        ),
        index('idx_content_key_published').using(
            'btree',
            table.isPublished.asc().nullsLast().op('bool_ops')
        ),
    ]
);

export const consultationsProducts = pgTable(
    'consultations_products',
    {
        consultationId: uuid().notNull(),
        productId: uuid().notNull(),
        purchasedName: jsonb(),
        originalPrice: numeric('original_price', {
            precision: 19,
            scale: 4,
        }),
        purchasedPrice: numeric('purchased_price', {
            precision: 19,
            scale: 4,
        }),
        wasDiscounted: boolean().default(false),
    },
    table => [
        foreignKey({
            columns: [table.consultationId],
            foreignColumns: [consultations.id],
            name: 'consultations_products_consultationId_consultation_id_fk',
        }).onDelete('cascade'),
        foreignKey({
            columns: [table.productId],
            foreignColumns: [consultationServices.id],
            name: 'consultations_products_productId_consultation_services_id_fk',
        }).onDelete('cascade'),
        primaryKey({
            columns: [table.consultationId, table.productId],
            name: 'consultations_products_consultationId_productId_pk',
        }),
    ]
);

export const postTags = pgTable(
    'post_tag',
    {
        postId: uuid().notNull(),
        tagId: uuid().notNull(),
    },
    table => [
        foreignKey({
            columns: [table.postId],
            foreignColumns: [posts.id],
            name: 'post_tag_postId_post_id_fk',
        }).onDelete('cascade'),
        foreignKey({
            columns: [table.tagId],
            foreignColumns: [tags.id],
            name: 'post_tag_tagId_tag_id_fk',
        }).onDelete('cascade'),
        primaryKey({
            columns: [table.postId, table.tagId],
            name: 'post_tag_postId_tagId_pk',
        }),
    ]
);

export const verificationTokens = pgTable(
    'verificationTokens',
    {
        identifier: text().notNull(),
        token: text().notNull(),
        expires: timestamp({ mode: 'string' }).notNull(),
    },
    table => [
        primaryKey({
            columns: [table.identifier, table.token],
            name: 'verificationTokens_identifier_token_pk',
        }),
    ]
);

export const accounts = pgTable(
    'account',
    {
        userId: uuid().notNull(),
        type: text().notNull(),
        provider: text().notNull(),
        providerAccountId: text().notNull(),
        refreshToken: text('refresh_token'),
        accessToken: text('access_token'),
        expiresAt: integer('expires_at'),
        tokenType: text('token_type'),
        scope: text(),
        idToken: text('id_token'),
        sessionState: text('session_state'),
    },
    table => [
        foreignKey({
            columns: [table.userId],
            foreignColumns: [users.id],
            name: 'account_userId_user_id_fk',
        }).onDelete('cascade'),
        primaryKey({
            columns: [table.provider, table.providerAccountId],
            name: 'account_provider_providerAccountId_pk',
        }),
    ]
);

export const instructors = pgTable('instructor', {
    id: uuid().defaultRandom().primaryKey().notNull(),
    name: text().notNull(),
    bio: text(),
    avatarUrl: text(),
    expertise: text().array(),
    createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
});

export const affiliateCodes = pgTable('affiliate_code', {
    id: uuid().defaultRandom().primaryKey().notNull(),
    code: text().notNull().unique(),
    discountPercent: integer().notNull().default(0),
    isActive: boolean().default(true).notNull(),
    expiresAt: timestamp({ mode: 'string' }),
});

// Relation
export const otpCodesRelations = relations(otpCodes, ({ one }) => ({
    users: one(users, {
        fields: [otpCodes.userId],
        references: [users.id],
    }),
}));

export const userRelations = relations(users, ({ many }) => ({
    otpCodes: many(otpCodes),
    sessions: many(sessions),
    userProfiles: many(userProfiles),
    userSettings: many(userSetting),
    accounts: many(accounts),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
    users: one(users, {
        fields: [sessions.userId],
        references: [users.id],
    }),
}));

export const userProfileRelations = relations(userProfiles, ({ one }) => ({
    users: one(users, {
        fields: [userProfiles.userId],
        references: [users.id],
    }),
}));

export const userSettingRelations = relations(userSetting, ({ one }) => ({
    users: one(users, {
        fields: [userSetting.userId],
        references: [users.id],
    }),
}));

export const consultationsProductsRelations = relations(
    consultationsProducts,
    ({ one }) => ({
        consultation: one(consultations, {
            fields: [consultationsProducts.consultationId],
            references: [consultations.id],
        }),
        consultationService: one(consultationServices, {
            fields: [consultationsProducts.productId],
            references: [consultationServices.id],
        }),
    })
);

export const consultationRelations = relations(consultations, ({ many }) => ({
    consultationsProducts: many(consultationsProducts),
}));

export const consultationServicesRelations = relations(
    consultationServices,
    ({ many }) => ({
        consultationsProducts: many(consultationsProducts),
    })
);

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

export const postRelations = relations(posts, ({ many }) => ({
    postTags: many(postTags),
}));

export const tagRelations = relations(tags, ({ many }) => ({
    postTags: many(postTags),
}));

export const accountRelations = relations(accounts, ({ one }) => ({
    users: one(users, {
        fields: [accounts.userId],
        references: [users.id],
    }),
}));

export const instructorRelations = relations(instructors, ({ many }) => ({
    services: many(consultationServices),
}));

export const transactionRelations = relations(transactions, ({ one }) => ({
    consultation: one(consultations, {
        fields: [transactions.consultationId],
        references: [consultations.id],
    }),
    user: one(users, {
        fields: [transactions.userId],
        references: [users.id],
    }),
}));

// Types
export type User = typeof users.$inferSelect;
export type UserSettings = typeof userSetting.$inferInsert;
export type UserProfile = typeof userProfiles.$inferSelect;
export type Account = typeof accounts.$inferSelect;
export type Session = typeof sessions.$inferSelect;
export type VerificationToken = typeof verificationTokens.$inferSelect;
export type OtpCode = typeof otpCodes.$inferSelect;
export type ConsultationServices = typeof consultationServices.$inferSelect;
export type ConsultationsProducts = typeof consultationsProducts.$inferSelect;
export type Consultation = typeof consultations.$inferSelect;
export type Post = typeof posts.$inferSelect & {
    currentInteractionType: 'LIKE' | 'DISLIKE' | null;
};
export type Tag = typeof tags.$inferSelect;
export type PostTag = typeof postTags.$inferSelect;

export type NewUser = typeof users.$inferInsert;
export type NewUserSettings = typeof userSetting.$inferInsert;
export type NewUserProfile = typeof userProfiles.$inferInsert;
export type NewAccount = typeof accounts.$inferInsert;
export type NewSession = typeof sessions.$inferInsert;
export type NewVerificationToken = typeof verificationTokens.$inferInsert;
export type NewOtpCode = typeof otpCodes.$inferInsert;
export type NewConsultationServices = typeof consultationServices.$inferInsert;
export type NewConsultationProducts = typeof consultationsProducts.$inferInsert;
export type NewConsultations = typeof consultations.$inferInsert;
export type NewPost = typeof posts.$inferInsert;
export type NewTag = typeof tags.$inferInsert;
export type NewPostTag = typeof postTags.$inferInsert;
