"use server";

import db from "@/db/db";
import { Todo } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function deleteTodo(id: string) {
  await db.delete(Todo).where(eq(Todo.id, id));
  redirect("/")
}
