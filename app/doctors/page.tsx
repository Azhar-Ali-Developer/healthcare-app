"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { Doctor } from "@/src/lib/db/schema";
import { Button } from "@/components/ui/button";


//--------------------------------------------------------------------------------------
export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  //--------------------------------------------------------------------------------------
  useEffect(() => {
    fetchDoctors();
  }, []);
  
  //--------------------------------------------------------------------------------------
  const fetchDoctors = async () => {
    try {
      const response = await fetch("/api/doctors");
      const data = await response.json();
      setDoctors(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load doctor");
    } finally {
      setLoading(false);
    }
  };
  
  //--------------------------------------------------------------------------------------
  const toggleAvailability = async (doctorId: number, isActive: boolean) => {
    await fetch(`/api/doctors/${doctorId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_active: isActive })
    });
    fetchDoctors();
  };

  console.log("doctors => ", doctors);


  //------------------------------------------------------------------------------------
  if (loading) {
    return <div className="p-8 text-center">Loading doctor details...</div>;
  }
  
  //------------------------------------------------------------------------------------
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

  //------------------------------------------------------------------------------------
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Doctor Directory ({doctors.length})</h1>
        <Link
          href="/doctors/new"
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
        >
          Add New Doctor
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <div 
            key={doctor.id}
            className="bg-white p-6 rounded-lg shadow border hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <Link 
                  href={`/doctors/${doctor.id}`}
                  className="group inline-block"
                >
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600">
                    Dr. {doctor.name}
                  </h3>
                </Link>
                <p className="text-gray-600 mt-1">{doctor.specialty}</p>
              </div>
              <Switch
                checked={doctor.is_active}
                onCheckedChange={(checked) => toggleAvailability(doctor.id, checked)}
              />
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-500">
                {doctor.is_active ? "Weekly Availability" : "Currently Unavailable"}
              </h4>
              {doctor.is_active ? (
                <div className="flex flex-wrap gap-2 mt-2">
                  {JSON.parse(doctor.availability).map((day: string) => (
                    <span 
                      key={day} 
                      className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm"
                    >
                      {day}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 mt-2">
                  This doctor is not currently accepting appointments
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {doctors.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No doctors found. Add your first doctor.
        </div>
      )}
    </div>
  );
}
