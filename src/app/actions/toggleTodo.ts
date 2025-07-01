"use server";

import db from "@/db/db";
import { Todo } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function toggleTodo(id: string, complete: boolean) {
  await db.update(Todo).set({ complete }).where(eq(Todo.id, id));

  redirect("/")
}

