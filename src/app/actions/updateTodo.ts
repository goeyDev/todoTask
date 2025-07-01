"use server"

import db from "@/drizzle/db";
import { TodosTable } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";

export async function updateTodo(
  id: string,
  newTitle: string,
  newPlanStartDate?: string,
  newPlanEndDate?: string,
  userID?:string 
) {

  if (!userID) return

  if (!newTitle.trim()) return;

  // Prepare update data object
  const updateData: Partial<{
    title: string;
    planStartDate: Date;
    planEndDate: Date;
  }> = {
    title: newTitle,
  };

  if (newPlanStartDate) updateData.planStartDate = new Date(newPlanStartDate);
  if (newPlanEndDate) updateData.planEndDate = new Date(newPlanEndDate);

  await db.update(TodosTable).set(updateData).where(and(eq(TodosTable.id, id),eq(TodosTable.userId,userID)));
// revalidatePath("/");
  // redirect("/");
}
