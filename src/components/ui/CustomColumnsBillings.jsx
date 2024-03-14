import { ArrowUpDown } from "lucide-react";
import { Button } from "./button";

export const columns = [
  {
    accessorKey: "contractorId",
    header: "contractorId",
  },
  {
    accessorKey: "workedHours",
    header: "workedHours",
  },
  {
    accessorKey: "month",
    header: "month",
  },
  {
    accessorKey: "year",
    header: "year",
  },
  {
    accessorKey: "profit",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className=""
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          profit
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];
