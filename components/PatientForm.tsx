// components/PatientForm.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "components/ui/button";
import { InferSelectModel } from 'drizzle-orm';
import { patients as patientsA } from "@/src/lib/db/schema";

// Use InferSelectModel to get the type from the schema
type PatientFormData = InferSelectModel<typeof patientsA>;

interface PatientResponse extends PatientFormData {
  id: number;
}

export default function PatientForm({ patientId }: { patientId?: string }) {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<PatientFormData>();
  const [loading, setLoading] = useState(false);
  const [dob, setDob] = useState<string>("");    

  const formatDate = (date: Date | undefined): string => {
    if (date == undefined) return "";
    console.log("String(date)", String(date));
    return String(date).split("T")[0];
  };

  useEffect(() => {
    if (patientId) {
      console.log("WWW patientId->", patientId);
      fetch(`/api/patients/${patientId}`)
        .then((res) => res.json())
        .then((data: PatientResponse) => {

          console.log("data.dob => ", data.dob);
          // const formattedDob = new Date(data.dob).toISOString().split("T")[0];
          // const formattedDob = formatDate(data.dob);

          reset({
            firstName: data.firstName,
            lastName: data.lastName,
            dob: data.dob,
            // dob: new Date("2021-01-02"),
            gender: data.gender,
            phone: data.phone,
            email: data.email,
          });
          setDob(formatDate(data.dob)); // Set dob manually
        });
    }
  }, [patientId, reset]);


  const onSubmit = async (data: PatientFormData) => {
    setLoading(true);
    try {
      console.log("patientId => ", patientId);
      const url = patientId ? `/api/patients/${patientId}` : "/api/patients";
      const method = patientId ? "PUT" : "POST";

      await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({...data, dob: dob}),
      });

      router.push("/patients");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl p-6 bg-white rounded-lg shadow-md">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            {...register("firstName", { required: true })} // Use firstName
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 text-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            {...register("lastName", { required: true })} // Use lastName
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 text-gray-900"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)} // Handle dob change manually
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 text-gray-900"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Gender</label>
        <select
          {...register("gender", { required: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 text-gray-900"
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          {...register("phone", { required: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 text-gray-900"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          {...register("email", { required: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 text-gray-900"
        />
      </div>

      <Button type="submit" disabled={loading} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded">
        {loading ? "Saving..." : patientId ? "Update Patient" : "Create Patient"}
      </Button>
    </form>
  );
}
