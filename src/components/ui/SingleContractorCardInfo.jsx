/* eslint-disable react/prop-types */
import {
  useUpdateHourlyRateMutation,
  useDeleteContractorMutation,
} from "@/app/api/apiSlice";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "./separator";
import { useToast } from "./use-toast";
import { DialogDescription } from "@radix-ui/react-dialog";

function SingleContractorCardInfo({ contractor }) {
  const { id } = useParams();

  const { toast } = useToast();

  const [deleteContractor] = useDeleteContractorMutation();
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

  const FormSchema = z.object({
    hourlyRate: z.coerce.number().gte(1, {
      message: "Hourly rate must be at least 1",
    }),
  });

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      hourlyRate: "",
    },
  });

  const [updateHourlyRate, { isLoading: isUpdating }] =
    useUpdateHourlyRateMutation();

  async function onSubmitHourlyRate(data) {
    try {
      await updateHourlyRate({ id, hourlyRate: data.hourlyRate }).unwrap();
      console.log("Hourly rate updated successfully!");
      toast({
        description: "Hourly rate updated successfully!",
        status: "success",
      });
    } catch (error) {
      console.error("Failed to update hourly rate:", error);
      const { status, data } = error;
      toast({
        description:
          data.message || "An error occurred while processing your request.",
        status: "error",
        variant: "destructive",
      });
    }
  }

  return (
    <>
      <div className="font-roboto flex justify-center items-center h-screen bg-myblack">
        <Card className="bg-myblack text-mywhite mx-10">
          <div className="p-2 text-center">Contractor ID: {id}</div>
          <CardHeader>
            <CardTitle>
              {contractor.data.firstName} {contractor.data.lastName}
            </CardTitle>
            <CardDescription className="text-mygray">
              manage your contractor
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mx-10 flex justify-between items-center my-2">
              <p className="p-2">hourly rate: {contractor.data.hourlyRate}</p>
              <Dialog>
                <DialogTrigger className="bg-myblack border hover:bg-mygray text-sm rounded text-mywhite p-2">
                  CHANGE
                </DialogTrigger>
                <DialogContent className="bg-myblack text-mywhite">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmitHourlyRate)}
                      className="w-2/3 space-y-6"
                    >
                      <FormField
                        control={form.control}
                        name="hourlyRate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Assign new hourly rate</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="*current value*"
                                {...field}
                                className="bg-myblack text-mywhite"
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        className="bg-myblack border text-mywhite hover:bg-mygray"
                        type="submit"
                      >
                        Submit
                      </Button>
                    </form>
                  </Form>
                  <DialogHeader></DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
            <Separator />
            <div className="mx-10 flex justify-between items-center my-2">
              <p className="p-2">
                monthly hour limit: {contractor.data.monthlyHourLimit}
              </p>
              <Button className="bg-mygray">CHANGE</Button>
            </div>
            <div className="mx-10 flex justify-between items-center my-2">
              <p className="p-2">
                overtime critical strike multiplier:{" "}
                {contractor.data.overtimeMultiplier}
              </p>
              <Button>CHANGE</Button>
            </div>
            <div className="mx-10 flex justify-between items-center my-2">
              <p className="p-2">
                hour price: {contractor.data.contractorHourPrice}
              </p>
              <Button>CHANGE</Button>
            </div>
            <div className="mx-10 flex justify-between items-center my-2">
              <p className="p-2">
                overtime paid?: {contractor.data.isOvertimePaid}
              </p>
              <Button>CHANGE</Button>
            </div>
            <div className="mx-10 flex justify-between items-center my-2">
              <p className="p-2">
                contract type: {contractor.data.contractType}
              </p>
              <Button>CHANGE</Button>
            </div>
          </CardContent>
          <CardFooter>
            <Dialog>
              <DialogTrigger className="bg-red-800 hover:bg-red-600 border text-sm rounded text-mywhite p-2">
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
                    onClick={() => handleDelete(id)}
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
            </Dialog>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default SingleContractorCardInfo;
