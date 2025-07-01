export const dynamic = 'force-dynamic'; // 👈 add this line

import db from "@/db/db";
import { Todo } from "@/db/schema";
import Link from "next/link";
import { eq } from "drizzle-orm";
import { toggleTodo } from "./actions/toggleTodo";
import { deleteTodo } from "./actions/deleteTodo";
import TodoItem from "./components/TodoItem";
import { updateTodo } from "./actions/updateTodo";

type PageProps = {
  searchParams: {
    filter?: string;
  };
};

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const filter = params.filter ?? "active"; // defaults to active

  console.log("Filter value:", filter); // ✅ debug output

  let todos;

  if (filter === "active") {
    todos = await db.select().from(Todo).where(eq(Todo.complete, false));
  } else if (filter === "completed") {
    todos = await db.select().from(Todo).where(eq(Todo.complete, true));
  } else {
    todos = await db.select().from(Todo); // includes both complete & incomplete
  }

  return (
    <main className="w-full mx-auto max-w-4xl px-4 py-8">
      <h1 className=" text-4xl font-bold text-center text-gray-800">
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
        <p className="text-2xl text-center mt-5">No tasks found.</p>
      ) : (
        <section className="mt-10 space-y-6">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              {...todo}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
              updateTodo={updateTodo}
            />
          ))}
        </section>
      )}
    </main>
  );
}
