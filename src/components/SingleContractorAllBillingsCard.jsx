/* eslint-disable react/prop-types */

import { SingleContractorBillingsTableTemplate } from "./ui/SingleContractorBillingsTableTemplate";
import { columns } from "./ui/CustomColumnsSingleBilling";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const SingleContractorAllBillingsCard = ({ contractor }) => {
  const navigate = useNavigate();
  function handleDelete(id) {
    console.log(id);
  }

  function handleEdit(id) {
    navigate(`/billing/${id}`);
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
    <div className="font-roboto bg-myblack text-mywhite flex justify-center">
      <SingleContractorBillingsTableTemplate
        columns={columns}
        data={contractor.data}
        actions={actions}
      />
    </div>
  );
};

export default SingleContractorAllBillingsCard;
