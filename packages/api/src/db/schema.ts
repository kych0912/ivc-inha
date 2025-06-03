import { integer, pgTable, serial, text, timestamp, boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const files = pgTable('files', {
  id: serial('id').primaryKey(),
  time: timestamp('time').notNull(),
  name: text('name').notNull(),
  fullPath: text('full_path').notNull(),
  path: text('path').notNull(),
  selected: boolean('selected').notNull().default(false),
  uploadedAt: timestamp('uploaded_at').notNull().defaultNow(),
  userId: integer('user_id').references(() => users.id),
});

export const formlink = pgTable('formlink', {
  id: serial('id').primaryKey(),
  link: text('link').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  selected: boolean('selected').notNull().default(false),
});

export const userRelations = relations(users, ({ many }) => ({
  files: many(files),
}));

export const filesRelations = relations(files, ({ one }) => ({
  user: one(users, {
    fields: [files.userId],
    references: [users.id],
  }),
}));

export type User = typeof users.$inferSelect;
export type File = typeof files.$inferSelect;
