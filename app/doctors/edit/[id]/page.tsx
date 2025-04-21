//move to gem
// app/doctors/edit/[id]/page.tsx

"use client";
import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import DoctorForm from "@/components/DoctorForm";
import { Doctor } from "@/src/lib/db/schema";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  specialty: z.string().min(1, "Specialty is required"),
  availability: z.array(z.string()).nonempty("Select at least one day"),
  unavailability_dates: z.string().optional(),
  is_active: z.boolean(),
});

//--------------------------------------------------------------------------------------
export default function EditDoctorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [doctor, setDoctor] = useState<Doctor>();

  //--------------------------------------------------------------------------------------
  useEffect(() => {
    const fetchDoctor = async () => {
      const { id } = await params;
      fetch(`/api/doctors/${id}`)
        .then((res) => res.json())
        .then((data) => setDoctor(data));
    };

    fetchDoctor();
  }, [params]);
  //--------------------------------------------------------------------------------------
  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    // return;
    const { id } = await params;
    await fetch(`/api/doctors/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    router.push("/doctors");
  };

  if (!doctor) return <div>Loading...</div>;

  //--------------------------------------------------------------------------------------
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Edit Doctor</h1>
      <DoctorForm initialData={doctor} onSubmit={handleSubmit} />
    </div>
  );
}





