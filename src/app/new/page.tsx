'use client';

import { useActionState } from "react";
import { handleAdd, type AddFormState } from "@/app/actions/handleAdd";
import Link from "next/link";

export default function New() {
  const initialState: AddFormState = { error: "" };
  const [state, formAction] = useActionState(handleAdd, initialState);

  return (
    <form
      action={formAction}
      className="max-w-3xl mx-auto mt-10 bg-gray-800 p-6 rounded-xl shadow-lg space-y-6"
    >
      <h2 className="text-2xl font-semibold text-white text-center">
        Add New Task
      </h2>

      {state.error && (
        <p className="text-red-400 text-sm text-center">{state.error}</p>
      )}

      {/* Title */}
      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="text-white text-sm">
          Task Title:
        </label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Enter your task title..."
          className="text-lg border border-gray-600 rounded-lg py-3 px-4 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Plan Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="planStartDate" className="text-white text-sm">
            Plan Start Date:
          </label>
          <input
            type="date"
            name="planStartDate"
            id="planStartDate"
            className="border border-gray-600 rounded-lg py-2 px-4 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="planEndDate" className="text-white text-sm">
            Plan End Date:
          </label>
          <input
            type="date"
            name="planEndDate"
            id="planEndDate"
            className="border border-gray-600 rounded-lg py-2 px-4 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 pt-4">
        <Link
          href="/"
          className="inline-flex items-center justify-center py-3 px-6 bg-slate-400 text-black rounded-lg hover:bg-slate-500"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="inline-flex items-center justify-center py-3 px-8 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add
        </button>
      </div>
    </form>
  );
}
