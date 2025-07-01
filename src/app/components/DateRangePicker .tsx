"use client";

import React, { useState } from "react";

type DateRangePickerProps = {
  onSubmit: (startDate: Date, endDate: Date) => void | Promise<void>;
  initialStartDate?: string; // ISO date string (optional)
  initialEndDate?: string; // ISO date string (optional)
};

export default function DateRangePicker({
  onSubmit,
  initialStartDate = "",
  initialEndDate = "",
}: DateRangePickerProps) {
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!startDate || !endDate) {
      setError("Please select both start and end dates.");
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      setError("Invalid date format.");
      return;
    }

    if (end < start) {
      setError("End date must be the same or after start date.");
      return;
    }

    setError(null);
    onSubmit(start, end);
  }

function handleClear() {
  setStartDate("");
  setEndDate("");
  setError(null);
  window.location.href = "/query";
}

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-gray-800 rounded-lg shadow-lg text-white space-y-4"
    >
      <div className="flex flex-col pb-5 ">
        <label
          htmlFor="start-date"
          className="block mb-1 font-semibold text-green-600"
        >
          Start Date:
        </label>
        <input
          id="start-date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className=" w-full rounded text-white text-xl"
        />
      </div>

      <div className="flex flex-col pb-5 ">
        <label
          htmlFor="end-date"
          className="block mb-1 font-semibold text-green-600"
        >
          End Date:
        </label>
        <input
          id="end-date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full rounded text-white text-xl"
        />
      </div>

      {error && <p className="text-red-400">{error}</p>}
      <div className="div">
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition-colors py-2 rounded font-semibold disabled:opacity-50"
          disabled={!startDate || !endDate}
        >
          Filter
        </button>

        <button
          type="button"
          onClick={handleClear}
          className="w-full mt-2 bg-gray-600 hover:bg-gray-700 transition-colors py-2 rounded font-semibold"
        >
          Clear
        </button>
      </div>
    </form>
  );
}
