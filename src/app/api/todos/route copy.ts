import { NextRequest, NextResponse } from "next/server";
import db from "@/db/db";
import { Todo } from "@/db/schema";
import { and, gte, lte } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const start = searchParams.get("start");
  const end = searchParams.get("end");

  if (!start || !end) {
    return NextResponse.json([], { status: 400 });
  }

  const startDate = new Date(start);
  const endDate = new Date(end);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    return NextResponse.json({ error: "Invalid dates" }, { status: 400 });
  }

  // Query todos where planStartDate <= end AND planEndDate >= start
  // This means todos overlapping the selected date range
  const todos = await db
    .select()
    .from(Todo)
    .where(
      and(
        lte(Todo.planStartDate, endDate),
        gte(Todo.planEndDate, startDate)
      )
    );

  return NextResponse.json(todos);
}
