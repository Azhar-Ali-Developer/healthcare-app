"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
// import { Button } from "@/components/ui/button";
import { patients as patientsA } from "@/src/lib/db/schema";
// import { dbPromise } from "@/src/lib/db";
import { InferSelectModel } from 'drizzle-orm';


export default function PatientsPage() {
  // const [patients, setPatients] = useState<Patient[]>([]);
  const [patients, setPatients] = useState<InferSelectModel<typeof patientsA>[]>([]);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    const response = await fetch("/api/patients");
    const data = await response.json();
    setPatients(data);
  };

  // const xhandleDelete = async (id: number) => {
  //   if (confirm("Are you sure you want to delete this patient?")) {
  //     await fetch(`/api/patients?id=${id}`, { method: "DELETE" });
  //     fetchPatients();
  //   }
  // };


  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this patient?")) {
      try {
        const response = await fetch(`/api/patients/${id}`, {
          method: "DELETE"
        });
        
        if (!response.ok) throw new Error("Delete failed");
        
        // Refresh patient list
        fetchPatients();
      } catch (error) {
        console.error("Delete error:", error);
        alert("Failed to delete patient");
      }
    }
  };
  // console.log("patients->",patients);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-900">Patient Management ({patients.length})</h1>
        <Link href="/patients/new" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Add New Patient
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow border">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">DOB</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Contact</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {patients.map((patient) => (              
              <tr key={patient.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-900 font-medium">{patient.firstName} {patient.lastName}</td>
                <td className="px-6 py-4 text-gray-700">{new Date(patient.dob).toISOString().split('T')[0].split('-').reverse().join().replace(",","/").replace(",","/")}</td>
                <td className="px-6 py-4 text-gray-700">
                  <div className="flex flex-col">
                    <span>{patient.phone}</span>
                    <span className="text-sm text-gray-500">{patient.email}</span>
                  </div>
                </td>
                <td className="px-6 py-4 space-x-2">
                  <Link 
                    href={`/patients/edit/${patient.id}`}
                    className="text-primary-600 hover:text-primary-900 mr-4"
                  >
                    Edit
                  </Link>
                  <button 
                    onClick={() => handleDelete(patient.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
