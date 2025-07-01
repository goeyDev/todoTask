'use server';

import db from "@/drizzle/db";
import { TodosTable } from "@/drizzle/schema";
import { redirect } from "next/navigation";
import { validateDateRange } from "@/app/components/helper";
import { getCurrentUser } from "@/auth/nextjs/currentUser";

// Define correct shape
export type AddFormState = {
  error: string;
};

export async function handleAdd(
  prevState: AddFormState,
  formData: FormData
): Promise<AddFormState> {

   const user = await getCurrentUser({withFullUser:true})

  const title = formData.get("title") as string;
  const planStartDate = formData.get("planStartDate") as string;
  const planEndDate = formData.get("planEndDate") as string;

  if (!title.trim() || !planStartDate || !planEndDate) {
    return { error: "All fields are required." };
  }

  if (!validateDateRange(planStartDate, planEndDate)) {
    return { error: "End date must be later than start date." };
  }

  await db.insert(TodosTable).values({
    title: title.charAt(0).toUpperCase() + title.slice(1),
    complete: false,
    planStartDate: new Date(planStartDate),
    planEndDate: new Date(planEndDate),
    userId:user?.id
  })


  redirect("/");
}
