"use client";

import { FC } from "react";
import { formatDdMmmYy } from "../utils/formatDate";

interface PlannedDateInfoProps {
  planStartDate: string | Date;
  planEndDate: string | Date;
}

const PlannedDateInfo: FC<PlannedDateInfoProps> = ({ planStartDate, planEndDate }) => {
  const now = new Date();
  const endDate = new Date(planEndDate);
  const startDate = new Date(planStartDate);

  const diffInTime = endDate.getTime() - now.getTime();
  const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24)); // Convert to full days

  let color = "text-white";

  if (diffInDays <= 2 && diffInDays >= 0) {
    color = "text-yellow-400";
  } else if (diffInDays < 0) {
    color = "text-red-500";
  }

  return (
    <p className={`text-md ${color} mt-2`}>
        Planned: {formatDdMmmYy(startDate)} to {formatDdMmmYy(endDate)}
      {/* Planned: {startDate.toLocaleDateString()} → {endDate.toLocaleDateString()} */}
      {diffInDays <= 2 && diffInDays >= 0 && " (Ending Soon)"}
      {diffInDays < 0 && " (Overdue)"}
    </p>
  );
};

export default PlannedDateInfo;
