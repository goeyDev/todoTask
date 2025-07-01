"use server";

import db from "@/drizzle/db";
import { TodosTable } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function deleteTodo(id: string,userID:string) {

  await db.delete(TodosTable).where(and(eq(TodosTable.id, id),eq(TodosTable.userId,userID)));
  redirect("/")
}
