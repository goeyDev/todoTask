"use client";

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { formatDdMmmYy } from "../utils/formatDate";

type Todo = {
  id: string;
  title: string;
  complete: boolean;
  planStartDate: string;
  planEndDate: string;
};

type ExportProps = {
  todos: Todo[];
};

export default function ExportTodoUniversal({ todos }: ExportProps) {
  const handleExport = async () => {
    if (!("showSaveFilePicker" in window)) {
      alert("Your browser doesn't support the File Save dialog.");
      return;
    }

    try {
      // @ts-expect-error: showSaveFilePicker is not yet typed in TypeScript DOM lib
      const handle = await window.showSaveFilePicker({
        suggestedName: "todos",
        types: [
          {
            description: "PDF file",
            accept: { "application/pdf": [".pdf"] },
          },
          {
            description: "CSV file",
            accept: { "text/csv": [".csv"] },
          },
          {
            description: "Excel file",
            accept: {
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                [".xlsx"],
            },
          },
        ],
      });

      // Get file and try to infer extension
      const file = await handle.getFile();
      let extension = handle.name.split(".").pop()?.toLowerCase();

      // 🔧 Fallback if no extension (user typed no extension)
      if (!extension || extension === handle.name.toLowerCase()) {
        const mime = file.type;
        if (mime === "application/pdf") {
          extension = "pdf";
        } else if (mime === "text/csv") {
          extension = "csv";
        } else if (
          mime ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ) {
          extension = "xlsx";
        } else {
          // Final fallback if MIME is unknown
          extension = "pdf";
        }
      }

      let blob: Blob;

      if (extension === "pdf") {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("Todos", 14, 22);

        const tableData = todos.map((todo, i) => [
          i + 1,
          todo.title,
          todo.complete ? "✅" : "❌",
          formatDdMmmYy(todo.planStartDate),
          formatDdMmmYy(todo.planEndDate),
          // new Date(todo.planStartDate).toLocaleDateString(),
          // new Date(todo.planEndDate).toLocaleDateString(),
        ]);

        autoTable(doc, {
          head: [["#", "Title", "Complete", "Start Date", "End Date"]],
          body: tableData,
          startY: 30,
        });

        blob = doc.output("blob");
      } else if (extension === "csv") {
        const rows = [
          ["#", "Title", "Complete", "Start Date", "End Date"],
          ...todos.map((todo, i) => [
            i + 1,
            todo.title,
            todo.complete ? "true" : "false",
            todo.planStartDate,
            todo.planEndDate,
          ]),
        ];
        const csv = rows.map((r) => r.join(",")).join("\n");
        blob = new Blob([csv], { type: "text/csv" });
      } else if (extension === "xlsx") {
        const ws = XLSX.utils.json_to_sheet(
          todos.map((todo, i) => ({
            "#": i + 1,
            Title: todo.title,
            Complete: todo.complete,
            "Start Date": todo.planStartDate,
            "End Date": todo.planEndDate,
          }))
        );
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Todos");

        const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        blob = new Blob([wbout], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
      } else {
        alert("❌ Unsupported file type. Please choose .pdf, .csv or .xlsx.");
        return;
      }

      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
    } catch (error) {
      console.log("Export cancelled or failed:", error);
    }
  };

  return (
    <div className="flex justify-end">
      <button
        onClick={handleExport}
        //   style={{ float: "right", marginTop: "2rem" }} use this for single button without div wrap
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
      >
        Export
      </button>
    </div>
  );
}
