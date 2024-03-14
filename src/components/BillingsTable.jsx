import { BillingsTableTemplate } from "./ui/BillingsTableTemplate";
import { columns } from "./ui/CustomColumnsBillings";
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
import { useToast } from "./ui/use-toast";
import { useGetContractorBillingQuery } from "@/app/api/apiSlice";
const BillingsTable = () => {
  const navigate = useNavigate();
  const {
    data: billings = [],
    error,
    isLoading,
  } = useGetContractorBillingQuery();
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
        <DropdownMenuContent align="end" className="bg-myblack text-mywhite">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => handleEdit(row.original.contractorId)}
          >
            MANAGE
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
  return (
    <>
      {" "}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <BillingsTableTemplate
          columns={columns}
          data={billings.data}
          actions={actions}
        />
      )}
    </>
  );
};

export default BillingsTable;
