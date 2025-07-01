"use client";

import { useState } from "react";
import PlannedDateInfo from "./PlannedDateInfo";
import { validateDateRange } from "./helper";
import { formatDdMmmYy } from "../utils/formatDate";

interface TodoItemProps {
  id: string;
  title: string;
  complete: boolean;
  updatedAt:string | Date
  planStartDate: string | Date;
  planEndDate: string | Date;
  toggleTodo: (id: string, complete: boolean) => void;
  updateTodo?: (
    id: string,
    newTitle: string,
    newPlanStartDate?: string,
    newPlanEndDate?: string
  ) => Promise<void>;
  deleteTodo?: (id: string) => void;
}

export default function TodoItem({
  id,
  title,
  complete,
  updatedAt,
  planStartDate,
  planEndDate,
  toggleTodo,
  deleteTodo,
  updateTodo,
}: TodoItemProps) {
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [message, setMessage] = useState("");
  const [newPlanStartDate, setNewPlanStartDate] = useState(
    planStartDate instanceof Date
      ? planStartDate.toISOString().slice(0, 10)
      : planStartDate
  );
  const [newPlanEndDate, setNewPlanEndDate] = useState(
    planEndDate instanceof Date
      ? planEndDate.toISOString().slice(0, 10)
      : planEndDate
  );
console.log("updated_at",updatedAt)
  return (
    <div className="bg-gray-800 text-white rounded-lg p-4 mb-4 shadow-md">
      {<p className="text-xl text-white">{message}</p>}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          {!editMode && (
            <input
              id={id}
              type="checkbox"
              className="w-5 h-5 accent-blue-500"
              defaultChecked={complete}
              onChange={(e) => toggleTodo(id, e.target.checked)}
            />
          )}
          {editMode ? (
            <form
              onSubmit={async (e) => {
                e.preventDefault();

                if (!validateDateRange(newPlanStartDate, newPlanEndDate)) {
                  alert("End date must be later than start date.");
                  return;
                }

                if (updateTodo && newTitle.trim()) {
                  await updateTodo(
                    id,
                    newTitle,
                    newPlanStartDate,
                    newPlanEndDate
                  );
                }
                setEditMode(false);
                setMessage("record was updated.");
              }}
              className="flex flex-col gap-2"
            >
              <input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="bg-gray-100 text-black rounded px-2 py-1 text-sm"
                placeholder="Title"
              />
              <div className="flex gap-2">
                <label className="text-white text-sm flex items-center gap-1">
                  Start:
                  <input
                    type="date"
                    value={newPlanStartDate}
                    onChange={(e) => setNewPlanStartDate(e.target.value)}
                    className="rounded px-4 py-3 text-lg text-white"
                  />
                </label>
                <label className="text-white text-sm flex items-center gap-1">
                  End:
                  <input
                    type="date"
                    value={newPlanEndDate}
                    onChange={(e) => setNewPlanEndDate(e.target.value)}
                    className="rounded px-4 py-3 text-lg text-white"
                  />
                </label>
              </div>
              <button
                type="submit"
                className="text-blue-400 hover:text-blue-600 text-lg self-start"
              >
                Save
              </button>
            </form>
          ) : (
            <label htmlFor={id} className="text-xl font-semibold">
              {title}
            </label>
          )}
        </div>
        {/* flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 
sm:gap-4 p-4 bg-gray-50 rounded-xl shadow-sm border border-gray-200 */}
        {!editMode && !complete ?(
          <div className="flex flex-col sm:flex-rowjustify-between items-end sm:items-center gap-2 sm:gap-4 p-4 hover:bg-gray-700 rounded-xl shadow-sm hover:border hover: border-gray-200 ">
            <PlannedDateInfo planStartDate={planStartDate} planEndDate={planEndDate}
            />
          </div>
        ):(
  <div className="text-sm text-gray-400">
    Last updated: {formatDdMmmYy(updatedAt)}
  </div>
)}
      </div>

      {/* <PlannedDateInfo
          planStartDate={planStartDate}
          planEndDate={planEndDate}
        /> */}

      {/* {!editMode && ( <p className="text-lg text-gray-400 whitespace-nowrap">
          📅 {new Date(planStartDate).toLocaleDateString()} →{" "}
          {new Date(planEndDate).toLocaleDateString()}
        </p>)} */}

      <div className="flex gap-4 mt-3">
        <button
          onClick={() => setEditMode(!editMode)}
          className="text-yellow-400 hover:text-yellow-600 text-lg"
        >
          {editMode ? "Cancel" : "Edit"}
        </button>

        {deleteTodo && (
          <form action={() => deleteTodo(id)}>
            <button className="text-red-500 hover:text-red-700 text-lg">
              Delete
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
