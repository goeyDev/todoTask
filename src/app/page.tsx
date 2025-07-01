export const dynamic = "force-dynamic"; // 👈 add this line


import { TodosTable } from "@/drizzle/schema";
import Link from "next/link";
import { and, eq } from "drizzle-orm";
import { toggleTodo } from "./actions/toggleTodo";
import { deleteTodo } from "./actions/deleteTodo";
import TodoItem from "./components/TodoItem";
import { updateTodo } from "./actions/updateTodo";
import { getCurrentUser } from "@/auth/nextjs/currentUser";
import Guest from "./components/guess";
import db from "@/drizzle/db";

type PageProps = {
  searchParams: Promise<{
    filter?: string;
  }>;
};

// {searchParams:Promise<{filter:string}>}
export default async function Home({ searchParams }: PageProps) {

  const user = await getCurrentUser({withFullUser:true})

  
  if (!user) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300">
      <Guest />
    </div>
  )
}

  
  const params = await searchParams;
  const filter = params.filter ?? "active"; // defaults to active
  // const filter = (await searchParams).filter ?? "active"; // defaults to active good

  let todos;

  if (filter === "active") {
    // todos = await db.select().from(TodosTable).where(and(eq(TodosTable.complete, false),eq(userTable.email,user.email))).leftJoin(userTable, eq(TodosTable.userId, userTable.id));
    todos = await db
  .select()
  .from(TodosTable)
  .where(
    and(
      eq(TodosTable.complete, false),
      eq(TodosTable.userId, user.id)
    )
  );
  } else if (filter === "completed") {
    todos = await db.select().from(TodosTable).where( and(
      eq(TodosTable.complete, true),
      eq(TodosTable.userId, user.id)
    ));
  } else {
    todos = await db.select().from(TodosTable).where(eq(TodosTable.userId,user.id)); // includes both complete & incomplete
  }

  return (
    <main className="w-full mx-auto max-w-4xl px-4 py-8">
      <h1 className=" text-4xl font-bold text-center text-blue-400 hover:underline hover:text-blue-600">
        Todo List
      </h1>

      <div className="text-center mt-6">
        <Link
          href="/new"
          className="inline-block py-2 px-4 bg-green-500 text-white rounded hover:bg-green-700 transition-colors"
        >
          Add New Todo
        </Link>
      </div>

      <div className="mt-8 flex justify-center gap-6 text-lg text-gray-500">
        <Link href="/?filter=" className="hover:underline hover:text-blue-600">
          All
        </Link>
        <Link
          href="/?filter=active"
          className="hover:underline hover:text-blue-600"
        >
          Active
        </Link>
        <Link
          href="/?filter=completed"
          className="hover:underline hover:text-blue-600"
        >
          Completed
        </Link>
      </div>

      {todos.length <= 0 ? (
        <p className="text-2xl text-center mt-5">No any tasks found from database.</p>
      ) : (
        <section className="mt-10 space-y-6">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              {...todo}
              userID={user.id}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
              updateTodo={updateTodo}
            />
          ))}
        </section>
      )}
      {/* <div>
        <p>Filter</p>
        <DateRangeFilter />
      </div> */}
    </main>
  );
}
