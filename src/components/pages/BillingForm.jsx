import {
  useCreateContractorBillingMutation,
  useGetContractorsQuery,
} from "../../app/api/apiSlice";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { useToast } from "../ui/use-toast";

const formSchema = z.object({
  month: z.string().min(1, {
    message: "month must be at least 1 characters.",
  }),
  lastName: z.string().min(1, {
    message: "lastName must be at least 1 characters.",
  }),
  id: z.coerce.number().gte(1, {
    message: "id must be at least 1",
  }),
  workedHours: z.coerce.number().gte(1, {
    message: "workedHours must be at least 1",
  }),
  year: z.coerce.number().gte(1, {
    message: "year must be at least 1",
  }),
});

const BillingForm = () => {
  const [
    createBilling,
    { isLoading: isLoadingBilling, isError: isErrorBilling },
  ] = useCreateContractorBillingMutation();
  const {
    data: contractors,
    isLoading: isLoadingContractor,
    isError: isErrorContractor,
  } = useGetContractorsQuery();

  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      month: "",
      id: "",
      workedHours: "",
      year: "",
    },
  });

  const handleSubmitBillingForm = async (formData) => {
    console.log("Form data:", formData);
    event.preventDefault();
    try {
      const response = await createBilling(formData).unwrap();
      if (response && response.code === 400) {
        toast({
          description:
            response.message ||
            "An error occurred while processing your request.",
          status: "error",
          variant: "destructive",
        });
      } else {
        toast({
          description: "Billing created successfully.",
          status: "success",
        });
        console.log("Billing created successfully:", response);
      }
    } catch (error) {
      console.error("Failed to create billing:", error);
      toast({
        description: "An error occurred while processing your request.",
        status: "error",
        variant: "destructive",
      });
    }
  };
  if (isLoadingContractor || isErrorContractor) {
    return null;
  }

  if (!contractors) {
    return null;
  }
  return (
    <div>
      <div className="font-roboto h-screen w-full flex items-center justify-center bg-myblack text-mywhite">
        <Form {...form}>
          <form
            onSubmit={(e) => handleSubmitBillingForm(form.getValues(), e)}
            className="space-y-8 border rounded-md p-2"
          >
            <div>Assign values and create new billing</div>
            <FormField
              control={form.control}
              name="month"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Month</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a month" />
                    </SelectTrigger>
                    <SelectContent className="font-roboto">
                      <SelectItem value="JANUARY">January</SelectItem>
                      <SelectItem value="FEBRUARY">February</SelectItem>
                      <SelectItem value="MARCH">March</SelectItem>
                      <SelectItem value="APRIL">April</SelectItem>
                      <SelectItem value="MAY">May</SelectItem>
                      <SelectItem value="JUNE">June</SelectItem>
                      <SelectItem value="JULY">July</SelectItem>
                      <SelectItem value="AUGUST">August</SelectItem>
                      <SelectItem value="SEPTEMBER">September</SelectItem>
                      <SelectItem value="OCTOBER">October</SelectItem>
                      <SelectItem value="NOVEMBER">November</SelectItem>
                      <SelectItem value="DECEMBER">December</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>contractor</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a contractor">
                        {field.value}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="font-roboto">
                      {contractors.data.map((contractor) => (
                        <SelectItem key={contractor.id} value={contractor.id}>
                          {contractor.firstName} {contractor.lastName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="workedHours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>workedHours</FormLabel>
                  <FormControl>
                    <Input placeholder="*workedHours" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>year</FormLabel>
                  <FormControl>
                    <Input placeholder="*year" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="bg-myblack, text-mywhite border hover:bg-mygray"
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default BillingForm;
