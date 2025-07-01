import DateRangeQueryPage from "../components/DateRangeQueryPage";


export default function QueryPage() {
  return (
    <main className="w-full max-w-3xl mx-auto px-4 py-8">
      <div className=" mt-4">
        <h1 className="text-3xl font-bold mb-6 text-center sm:text-left ">
          Filter Todos by Date
        </h1>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 ">
        <DateRangeQueryPage />

      </div>
    </main>
  );
}
