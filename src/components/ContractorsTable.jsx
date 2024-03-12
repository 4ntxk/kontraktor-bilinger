import { TableTemplate } from "./ui/TableTemplate";
import { columns } from "./ui/CustomColumns";
import { useGetContractorsQuery } from "@/app/api/apiSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const ContractorsTable = () => {
  const { data: contractors = [], error, isLoading } = useGetContractorsQuery();
  const navigate = useNavigate();
  function handleDelete(id) {
    console.log(id);
  }
  function handleEdit(id) {
    navigate(`/contractor/${id}`);
  }
  const actions = ({ row }) => (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleEdit(row.original.id)}>
            MANAGE
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleDelete(row.original.id)}>
            DELETE
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <TableTemplate
          columns={columns}
          data={contractors.data}
          actions={actions}
        />
      )}
    </>
  );
};

export default ContractorsTable;
