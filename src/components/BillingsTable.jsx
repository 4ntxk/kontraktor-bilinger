import { BillingsTableTemplate } from "./ui/BillingsTableTemplate";
import { columns } from "./ui/CustomColumnsBillings";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { MoreHorizontal } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "./ui/use-toast";
import {
  useDeleteBillingMutation,
  useGetContractorBillingQuery,
} from "@/app/api/apiSlice";
import { DialogDescription } from "@radix-ui/react-dialog";

const BillingsTable = () => {
  const navigate = useNavigate();
  const {
    data: billings = [],
    error,
    isLoading,
  } = useGetContractorBillingQuery();
  const [deleteBilling] = useDeleteBillingMutation();
  const { toast } = useToast();
  function handleEdit(id) {
    navigate(`/contractor/${id}`);
  }
  const handleDelete = async (id) => {
    try {
      const response = await deleteBilling(id).unwrap();
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
  const handleUpdateWH = async (id) => {
    console.log(id);
  };
  const actions = ({ row }) => (
    <div className="font-roboto">
      <DropdownMenu modal={false}>
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
            GO TO CONTRACTOR
          </DropdownMenuItem>
          <Dialog>
            <DropdownMenuItem
              className="mx-0 p-0 mt-1"
              onSelect={(e) => e.preventDefault()}
            >
              <DialogTrigger className="w-full hover:text-myblack text-sm rounded text-mywhite p-1">
                Update WH
              </DialogTrigger>
              <DialogContent className="bg-myblack text-mywhite">
                <DialogTitle>Worked hours</DialogTitle>
                <DialogDescription>Assign new value</DialogDescription>
                <DialogClose asChild>
                  <Button
                    type="button"
                    className="bg-myblack text-mywhite border hover:bg-mygray"
                    onClick={() => handleUpdateWH(row.original.id)}
                  >
                    Submit
                  </Button>
                </DialogClose>
              </DialogContent>
            </DropdownMenuItem>
          </Dialog>
          <Dialog>
            <DropdownMenuItem
              className="mx-0 p-0 mt-1"
              onSelect={(e) => e.preventDefault()}
            >
              <DialogTrigger className="w-full bg-red-800 hover:bg-red-600 text-sm rounded text-mywhite p-1">
                DELETE
              </DialogTrigger>
              <DialogContent className="bg-myblack text-mywhite">
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogDescription>
                  This process is irreversable.
                </DialogDescription>
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => handleDelete(row.original.id)}
                  >
                    Yes
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    type="button"
                    className="bg-myblack text-mywhite border hover:bg-mygray"
                  >
                    No
                  </Button>
                </DialogClose>
              </DialogContent>
            </DropdownMenuItem>
          </Dialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
  return (
    <>
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
