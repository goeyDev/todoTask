"use server";

import db from "@/drizzle/db";
import { TodosTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function toggleTodo(id: string, complete: boolean) {
  await db.update(TodosTable).set({ complete }).where(eq(TodosTable.id, id));

  redirect("/")
}

