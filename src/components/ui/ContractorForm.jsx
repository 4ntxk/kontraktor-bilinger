import { useCreateContractorMutation } from "../../app/api/apiSlice";
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
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "./use-toast";

const contractType = z.enum(["1", "2", "3"]);

const formSchema = z.object({
  firstName: z.string().min(1, {
    message: "firstName must be at least 1 characters.",
  }),
  lastName: z.string().min(1, {
    message: "lastName must be at least 1 characters.",
  }),
  contractType: contractType,
  hourlyRate: z.coerce.number().gte(1, {
    message: "Hourly rate must be at least 1",
  }),
  monthlyHourLimit: z.coerce.number().gte(1, {
    message: "monthlyHourLimit must be at least 1",
  }),
  overtimeMultiplier: z.coerce.number().gte(1, {
    message: "overtimeMultiplier must be at least 1",
  }),
  contractorHourPrice: z.coerce.number().gte(1, {
    message: "contractorHourPrice must be at least 1",
  }),
  isOvertimePaid: z.boolean().default(false),
});

// eslint-disable-next-line react/prop-types
const ContractorForm = () => {
  const [createContractor, { isLoading, isError }] =
    useCreateContractorMutation();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",

      hourlyRate: "",
      monthlyHourLimit: "",
      overtimeMultiplier: "",
      isOvertimePaid: false,
      contractorHourPrice: "",
    },
  });
  const handleSubmitContractorForm = async (formData) => {
    console.log("Form data:", formData);
    try {
      const response = await createContractor(formData).unwrap();
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
          description: "Contractor created successfully.",
          status: "success",
        });
        console.log("Contractor created successfully:", response);
      }
    } catch (error) {
      console.error("Failed to create contractor:", error);
      toast({
        description: "An error occurred while processing your request.",
        status: "error",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <div className="font-roboto h-screen w-full flex items-center justify-center bg-myblack text-mywhite">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmitContractorForm)}
            className="space-y-8 border rounded-md p-2"
          >
            <div>Assign values and create new contractor</div>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="*first name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="*last name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contractType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>contractType</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified contractType to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="font-roboto">
                      <SelectItem value="1">CONTRACT_OF_EMPLOYMENT</SelectItem>
                      <SelectItem value="2">CONTRACT_OF_MANDATE</SelectItem>
                      <SelectItem value="3">CONTRACT_B2B</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hourlyRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>hourlyRate</FormLabel>
                  <FormControl>
                    <Input placeholder="*hourlyRate" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="monthlyHourLimit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>monthlyHourLimit</FormLabel>
                  <FormControl>
                    <Input placeholder="*monthlyHourLimit" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="overtimeMultiplier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>overtimeMultiplier</FormLabel>
                  <FormControl>
                    <Input placeholder="*overtimeMultiplier" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Is overtime paid</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contractorHourPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>contractorHourPrice</FormLabel>
                  <FormControl>
                    <Input placeholder="*contractorHourPrice" {...field} />
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

export default ContractorForm;
