import { TableTemplate } from "./ui/TableTemplate";
import { columns } from "./ui/CustomColumns";
import {
  useDeleteContractorMutation,
  useGetContractorsQuery,
} from "@/app/api/apiSlice";
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
import { useState } from "react";
import { useToast } from "./ui/use-toast";
const ContractorsTable = () => {
  const { data: contractors = [], error, isLoading } = useGetContractorsQuery();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteContractor] = useDeleteContractorMutation();
  const { toast } = useToast();

  const handleDelete = async (id) => {
    try {
      const response = await deleteContractor(id).unwrap();
      if (response && response.code === 200) {
        toast({
          description: "Delete Success.",
          status: "success",
        });
      } else {
        toast({
          description:
            response.message ||
            "An error occurred while processing your request.",
          status: "error",
          variant: "destructive",
        });
      }
    } catch (error) {
      const { status, data } = error;
      console.error("Error Status:", status);
      console.error("Error Data:", data);
      toast({
        description: "An error occurred while processing your request.",
        status: "error",
        variant: "destructive",
      });
    }
  };

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
