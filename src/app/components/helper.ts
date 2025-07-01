export function validateDateRange(
  startDate: string | Date,
  endDate: string | Date
): boolean {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error("Invalid date format");
  }

  // Allow same day (end >= start)
  return end >= start;
}

// export function validateDateRange(
//   startDate: string | Date,
//   endDate: string | Date
// ): boolean {
//   const start = new Date(startDate);
//   const end = new Date(endDate);

//   console.log("Start:", start);
//   console.log("End:", end);

//   if (end <= start) {
//     // alert("End date must be later than start date.");
//     return false;
//   }

//   return true;
// }

// import db from "@/db/db"
// import { Todo } from "@/db/schema"
// import { eq } from "drizzle-orm"
  
//   export async function toggleTodo(id:string, complete:boolean){


//   const [status] = await db.select().from(Todo).where(eq(Todo.id,id))

//   if(status.complete == false ){
//     status.complete = true
//   }else{
//     status.complete = false
//   }
  
//   await db.update(Todo).set({complete:status.complete}).where(eq(Todo.id,id))
//   }

// export async function validateAndUpdateTodo({
//   startDate,
//   endDate,
//   title,
//   updateTodo,
//   id,
// }: {
//   startDate: string;
//   endDate: string;
//   title: string;
//   updateTodo: (
//     id: string,
//     title: string,
//     startDate: string,
//     endDate: string
//   ) => Promise<void>;
//   id: string;
// }): Promise<boolean> {
//   const start = new Date(startDate);
//   const end = new Date(endDate);

//   if (end <= start) {
//     alert("End date must be later than start date.");
//     return false;
//   }

//   if (!title.trim()) {
//     alert("Title is required.");
//     return false;
//   }

//   await updateTodo(id, title, startDate, endDate);
//   return true;
// }