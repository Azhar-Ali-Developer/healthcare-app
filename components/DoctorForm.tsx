import { Button } from "@/components/ui/button";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MultiSelect } from "@/components/ui/multi-select";
import {
  Doctor,
} from "@/src/lib/db/schema";
import {
  daysOfWeek,
  specialtyOptions,
} from "@/src/lib/db/schema.client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  specialty: z.string().min(1, "Specialty is required"),
  availability: z.array(z.string()).nonempty("Select at least one day"),
  // availability: z.string().min(1, "Availability is required"),
  unavailability_dates: z.string().optional(),
  is_active: z.boolean(),
});

interface DoctorFormProps {
  initialData?: Doctor;
  onSubmit: (data: z.infer<typeof formSchema>) => Promise<void>;
}

const DoctorForm: React.FC<DoctorFormProps> = ({ initialData, onSubmit }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      specialty: initialData?.specialty || "",
      // availability: initialData?.availability || "",
      availability: initialData?.availability ? JSON.parse(initialData.availability) : [],
      unavailability_dates: initialData?.unavailability_dates || "",
      is_active: initialData?.is_active ?? true,
    },
  });
  const { isSubmitting, reset } = form.formState;

  useEffect(() => {
      if (initialData) {
        form.reset({
          name: initialData.name,
          specialty: initialData.specialty,
          availability: JSON.parse(initialData.availability),
          unavailability_dates: initialData.unavailability_dates || "",
          is_active: initialData.is_active,
        });
      }
    }, [initialData, reset]);
  
  // const { isSubmitting } = form.formState;

  // return (
  //   <div className="p-8 max-w-2xl mx-auto">
  //     <h1 className="text-2xl font-bold mb-6 text-gray-900">Form Doctor</h1>
  //   </div>
  // );

  // return (
  //     <Form {...form}>
  //       <form className="space-y-4">
  //       <h1>DoctorForm.tsx</h1>
  //       </form>
  //     </Form>
  //   );
  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <div>
                  <FormItem>
                    <FormLabel className="block text-sm font-medium mb-1 text-gray-900">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 text-gray-500"
                        placeholder="Dr. John Doe"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
  
            <FormField
              control={form.control}
              name="specialty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Specialty</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-gray-50 border-gray-300">
                        <SelectValue placeholder="Select specialty" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {specialtyOptions.map((specialty) => (
                        <SelectItem key={specialty} value={specialty}>
                          {specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
  
            <FormField
              control={form.control}
              name="availability"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Availability</FormLabel>
                  <MultiSelect
                    selected={field.value}
                    options={daysOfWeek.map((day) => ({
                      value: day,
                      label: day,
                    }))}
                    onChange={field.onChange}
                    className="bg-gray-50 border-gray-300"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
  
            <FormField
              control={form.control}
              name="unavailability_dates"
              render={({ field }) => (
                <div>
                  <FormItem>
                    <FormLabel className="block text-sm font-medium mb-1 text-gray-900">
                      Unavailability Dates
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 text-gray-500"
                        placeholder="2024-12-25, 2025-01-01"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
  
            <FormField
              control={form.control}
              name="is_active"
              render={({ field }) => (
                <div>
                  <FormItem>
                    <FormLabel className="block text-sm font-medium mb-1 text-gray-900">
                      Is Active
                    </FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(value === "true")}
                      defaultValue={String(field.value)}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 text-gray-500">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="true">Active</SelectItem>
                        <SelectItem value="false">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
          </div>
  
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            {isSubmitting ? "Saving..." : "Save Doctor"}
          </Button>
        </form>
      </Form>
    );
};

export default DoctorForm;