"use client";

import React, { useState } from "react";
import DateRangePicker from "./DateRangePicker ";
import { formatDdMmmYy } from "../utils/formatDate";


type Todo = {
  id: string;
  title: string;
  complete: boolean;
  planStartDate: string;
  planEndDate: string;
};

export default function DateRangeFilter() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleFilter(startDate: Date, endDate: Date) {
    setLoading(true);

    // Call your API route that returns todos between dates
    const res = await fetch(
      `/api/todos?start=${startDate.toISOString()}&end=${endDate.toISOString()}`
    );

    if (!res.ok) {
      alert("Failed to fetch todos");
      setLoading(false);
      return;
    }

    const data = await res.json();
    setTodos(data);
    setLoading(false);
  }

  return (
    <section>
      <DateRangePicker onSubmit={handleFilter} />

      {loading && <p>Loading todos...</p>}

      {!loading && todos.length === 0 && <p>No todos found for this range.</p>}

      <ul className="mt-6 space-y-2 ">
        {todos.map((todo) => (
          <li key={todo.id} className="border p-3 rounded">
            <strong>{todo.title}</strong> — Planned from{" "}
            {formatDdMmmYy(todo.planStartDate)} to {formatDdMmmYy(todo.planEndDate)}
          </li>
        ))}
      </ul>
    </section>
  );
}
