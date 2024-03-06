import { useState } from "react";
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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "firstName must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "lastName must be at least 2 characters.",
  }),
  salary: z.coerce.number().gte(1, {
    message: "salary chociaz must be at leat kurwa ziko",
  }),
  isOvertimePaid: z.boolean(),
  monthlyHourLimit: z.coerce.number().gte(1, {
    message: "monthlyHourLimit must be at leat kurwa ziko",
  }),
  overtimeMultiplier: z.coerce.number().gte(1, {
    message: "overtimeMultiplier must be at leat kurwa ziko",
  }),
  contractorHourPrice: z.coerce.number().gte(1, {
    message: "contractorHourPrice must be at leat kurwa ziko",
  }),
  hourlyRate: z.coerce.number().gte(1, {
    message: "hourlyRate must be at leat kurwa ziko",
  }),
  contractType: z.coerce.number().gte(1, {
    message: "chuj wie",
  }),
});

// eslint-disable-next-line react/prop-types
const ContractorForm = () => {
  const [createContractor, { isLoading, isError }] =
    useCreateContractorMutation();

  const handleSubmitContractorForm = async (formData) => {
    try {
      await createContractor(formData);
      console.log(formData);
    } catch (error) {
      console.log(error);
    }
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      salary: 0,
      isOvertimePaid: false,
      monthlyHourLimit: 0,
      overtimeMultiplier: 1,
      contractorHourPrice: 0,
      hourlyRate: 0,
      contractType: "",
    },
  });

  return (
    <div className="flex items-center justify-center mt-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((formData) =>
            handleSubmitContractorForm(formData)
          )}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>firstName</FormLabel>
                <FormControl>
                  <Input placeholder="cwel" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>lastName</FormLabel>
                <FormControl>
                  <Input placeholder="lastcwel" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="salary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>salary</FormLabel>
                <FormControl>
                  <Input placeholder="3" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isOvertimePaid"
            render={({ field }) => (
              <FormItem>
                <FormLabel>isOvertimePaid</FormLabel>
                <FormControl>
                  <Input placeholder="cwel" type="checkbox" {...field} />
                </FormControl>
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
                  <Input placeholder="13" {...field} />
                </FormControl>
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
                  <Input placeholder="132" {...field} />
                </FormControl>
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
                  <Input placeholder="1324" {...field} />
                </FormControl>
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
                  <Input placeholder="2" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contractType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>contractType</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default ContractorForm;
