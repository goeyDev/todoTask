"use server"

import db from "@/db/db";
import { Todo } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function updateTodo(
  id: string,
  newTitle: string,
  newPlanStartDate?: string,
  newPlanEndDate?: string
) {
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

  await db.update(Todo).set(updateData).where(eq(Todo.id, id));
// revalidatePath("/");
  // redirect("/");
}
