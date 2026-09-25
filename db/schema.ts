import {integer,sqliteTable,text} from 'drizzle-orm/sqlite-core';
export const accountProfile=sqliteTable('account_profile',{
 username:text('username').primaryKey(), email:text('email').notNull().default(''),
 passwordHash:text('password_hash').notNull(), salt:text('salt').notNull(),
 algorithm:text('algorithm').notNull().default('sha256-legacy'),
 sessionVersion:integer('session_version').notNull().default(0),
 updatedAt:text('updated_at').notNull(),
});
