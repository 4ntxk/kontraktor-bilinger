import {
  useGetContractorByIdQuery,
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
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

function SingleContractorCardInfo() {
  const { id } = useParams();
  const { data: contractor, error, isLoading } = useGetContractorByIdQuery(id);

  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteContractor] = useDeleteContractorMutation(); // Destructure the mutation function

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteContractor(id); // Call the mutation function with the ID
      setIsDeleting(false);
      // Optionally: Redirect or perform any other action after successful deletion
    } catch (error) {
      console.error("Error deleting contractor:", error);
      setIsDeleting(false);
    }
  };

  const FormSchema = z.object({
    hourlyRate: z.coerce.number().gte(14, {
      message: "hourly rate must be at leat kurwa 14 ziko",
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

  async function onSubmit(data) {
    try {
      await updateHourlyRate({ id, hourlyRate: data.hourlyRate }).unwrap();
      // Optionally, you can handle success here (e.g., show a success message)
      console.log("Hourly rate updated successfully!");
    } catch (error) {
      // Optionally, you can handle error here (e.g., show an error message)
      console.error("Failed to update hourly rate:", error);
    }
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!contractor) {
    return <div>No contractor found.</div>;
  }

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <Card className="w-1/3">
          <div>User ID: {id}</div>
          <CardHeader>
            <CardTitle>
              {contractor.data.firstName} {contractor.data.lastName}
            </CardTitle>
            <CardDescription>manage your contractor</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mx-10 flex justify-between items-center my-2">
              <p className="p-2">hourly rate: {contractor.data.hourlyRate}</p>
              <Dialog>
                <DialogTrigger className="bg-primary rounded text-white p-2">
                  CHANGE
                </DialogTrigger>
                <DialogContent>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="w-2/3 space-y-6"
                    >
                      <FormField
                        control={form.control}
                        name="hourlyRate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>New hourly rate</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="current value dodam pozniej"
                                {...field}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit">Submit</Button>
                    </form>
                  </Form>
                  <DialogHeader>
                    <DialogTitle>
                      You are about to chnage hourly rate
                    </DialogTitle>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
            <div className="mx-10 flex justify-between items-center my-2">
              <p className="p-2">
                monthly hour limit: {contractor.data.monthlyHourLimit}
              </p>
              <Button>CHANGE</Button>
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
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "DELETE"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default SingleContractorCardInfo;
