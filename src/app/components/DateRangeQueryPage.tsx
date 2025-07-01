"use client";

import React, { useState } from "react";
import DateRangePicker from "./DateRangePicker ";
import ExportTodoPdf from "./PdfExportButton";
import { formatDdMmmYy } from "../utils/formatDate";

type Todo = {
  id: string;
  title: string;
  complete: boolean;
  planStartDate: string;
  planEndDate: string;
};

export default function DateRangeQueryPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(startDate: Date, endDate: Date) {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/todos?start=${startDate.toISOString()}&end=${endDate.toISOString()}`
      );
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      console.error("Failed to fetch todos:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <DateRangePicker onSubmit={handleSubmit} />

      {loading && <p className="mt-4 text-gray-500">Loading todos...</p>}

      {!loading && todos.length === 0 && (
        <p className="mt-4 text-gray-500">No todos found for this range.</p>
      )}

      <ul className="mt-6 space-y-3">
        {todos.map((todo) => (
          <li key={todo.id} className="bg-gray-500 rounded-lg shadow p-6 mt-4">
            <p className="font-semibold text-white mb-2">{todo.title}</p>
            <p className="text-md text-gray-900">
              {formatDdMmmYy(todo.planStartDate)} to {formatDdMmmYy(todo.planEndDate)}
            </p>
          </li>
        ))}
      </ul>
      {todos.length > 0 && <ExportTodoPdf todos={todos} />}
    </div>
  );
}
