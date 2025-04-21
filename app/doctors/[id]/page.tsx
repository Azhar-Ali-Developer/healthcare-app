"use client";
import { useEffect, useState, use } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Doctor } from "@/src/lib/db/schema";


//--------------------------------------------------------------------------------------
export default function DoctorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); // Unwrap the params

  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await fetch(`/api/doctors/${id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Doctor not found");
          }
          throw new Error("Failed to fetch doctor");
        }

        const data = await response.json();
        setDoctor(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load doctor");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);
  
  if (loading) {
    return <div className="p-8 text-center">Loading doctor details...</div>;
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-600">
        {error}
        <div className="mt-4">
          <Link href="/doctors">
            <Button variant="outline">Back to Doctors</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!doctor) {
    return <div className="p-8 text-center">Doctor not found</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{doctor.name}</h1>
          <p className="text-primary-600 text-lg mt-2">{doctor.specialty}</p>
        </div>
        <Link href="/doctors">
          <Button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700" variant="outline">Back to Doctors</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-xl font-semibold mb-4  text-gray-900">Details</h2>
          <div className="space-y-2 text-gray-900">
            <p><strong>Status:</strong> {doctor.is_active ? "Active" : "Inactive"}</p>
            <p><strong>Unavailable Dates:</strong></p>
            <Calendar
              mode="multiple"
              selected={
                doctor.unavailability_dates
                  ? JSON.parse(doctor.unavailability_dates).map((d: string) => new Date(d))
                  : []
              }
              
              className="rounded-md border"
              disabled
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Actions</h2>
          <div className="space-y-4">
            <Link href={`/doctors/edit/${doctor.id}`} className="block">
              <Button className="w-full text-gray-900">Edit Profile</Button>
            </Link>
            <Link href={`/doctors/availability/${doctor.id}`} className="block">
              <Button variant="outline" className="w-full text-gray-900">
                Manage Availability
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}