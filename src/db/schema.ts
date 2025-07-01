import { pgTable, uuid, varchar, boolean, timestamp  } from "drizzle-orm/pg-core";

const createdAt = timestamp("created_at").notNull().defaultNow();
const updatedAt = timestamp("updated_at")
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date());

export const Todo = pgTable("todo", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  complete: boolean("complete").notNull(),
  planStartDate:timestamp("plan_start_date").notNull(),
  planEndDate:timestamp("plan_end_date").notNull(),
  createdAt,
  updatedAt,
});


