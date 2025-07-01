// utils/formatDate.ts

/**
 * Formats a date string to 'ddMmmYY' format (e.g., 26May25)
 * @param dateStr - ISO string or Date
 */
// export function formatDdMmmYy(dateStr: string | Date): string {
//   const d = new Date(dateStr);
//   if (isNaN(d.getTime())) return ""; // Handle invalid date

//   const day = String(d.getDate()).padStart(2, "0");
//   const month = d.toLocaleString("en-US", { month: "short" });
//   const year = String(d.getFullYear()).slice(-2);

//   return `${day}${month}${year}`;
// }


// utils/formatDate.ts

/**
 * Formats a date string to 'ddMmmYY HH:mm' format (e.g., 26May25 14:30)
 * @param dateStr - ISO string or Date
 */
export function formatDdMmmYy(dateStr: string | Date): string {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return ""; // Handle invalid date

  const day = String(d.getDate()).padStart(2, "0");
  const month = d.toLocaleString("en-US", { month: "short" });
  const year = String(d.getFullYear()).slice(-2);

  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");

  return `${day}${month}${year} ${hours}:${minutes}`;
}
