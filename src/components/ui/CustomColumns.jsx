import { ArrowUpDown } from "lucide-react";
import { Button } from "./button";
import { DataTableColumnHeader } from "./DataTableColumnHeader";

export const columns = [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className=""
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "monthlyEarnings",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="monthlyEarnings" />
    ),
  },
];
