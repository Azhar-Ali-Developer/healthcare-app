// app/doctors/new/page.tsx

"use client";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  specialty: z.string().min(1, "Specialty is required"),
  availability: z.array(z.string()).nonempty("Select at least one day"),
});

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

//--------------------------------------------------------------------------------------
export default function NewDoctorPage() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      specialty: "",
      availability: [],
    },
  });

  //--------------------------------------------------------------------------------------
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("/api/doctors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          availability: JSON.stringify(values.availability),
        }),
      });

      if (response.ok) router.push("/doctors");
    } catch (error) {
      console.error("Error creating doctor:", error);
    }
  }

  //--------------------------------------------------------------------------------------
  return (
    <div className="p-8 max-w-2xl mx-auto bg-white rounded-lg shadow-md border">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Add New Doctor</h1>
        <Button
          variant="ghost"
          onClick={() => router.push("/doctors")}
          className="text-gray-600 hover:text-gray-800"
        >
          Cancel
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-900">Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Dr. John Doe"
                    {...field}
                    className="bg-gray-50 border-gray-300 focus-visible:ring-primary-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Specialty Field */}
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
                    <SelectItem value="Cardiology">Cardiology</SelectItem>
                    <SelectItem value="Dermatology">Dermatology</SelectItem>
                    <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                    <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                    <SelectItem value="Neurology">Neurology</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Availability Field */}
          <FormField
            control={form.control}
            name="availability"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Availability</FormLabel>
                <MultiSelect
                  selected={field.value}
                  options={daysOfWeek.map(day => ({
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

          <div className="flex justify-end gap-4">
            <Button
              type="submit"
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3"
            >
              Create Doctor
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}