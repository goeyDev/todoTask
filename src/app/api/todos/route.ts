import { NextRequest, NextResponse } from "next/server";
import db from "@/drizzle/db";
import { TodosTable } from "@/drizzle/schema";
import { and, eq, gte, lte } from "drizzle-orm";
import { getCurrentUser } from "@/auth/nextjs/currentUser";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const start = searchParams.get("start");
  const end = searchParams.get("end");
  const user = await getCurrentUser({withFullUser:true})

  if (!start || !end || !user) {
    return NextResponse.json([], { status: 400 });
  }

  const startDate = new Date(start);
  const endDate = new Date(end);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    return NextResponse.json({ error: "Invalid dates" }, { status: 400 });
  }

  const todos = await db
    .select()
    .from(TodosTable)
    .where(
      and(
        lte(TodosTable.planStartDate, endDate),
        gte(TodosTable.planEndDate, startDate),
        eq(TodosTable.userId, user.id)
      )
    );

  return NextResponse.json(todos);
}
