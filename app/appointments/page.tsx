import { dbPromise } from "@/src/lib/db";
import { appointments, patients, doctors } from "@/src/lib/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import PageContainer from '@/components/PageContainer'


export default async function AppointmentsPage() {
    const db = await dbPromise; // Await the database connection
    
    if (!db) {
      throw new Error("Database connection not established."); // Handle connection failure
    }
    
    const appointmentList = await db
    .select()
    .from(appointments)
    .innerJoin(patients, eq(appointments.patientId, patients.id))
    .innerJoin(doctors, eq(appointments.doctorId, doctors.id));

  return (
    <PageContainer>
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-teal-900">Appointment Scheduling ({appointmentList.length})</h1>
        <Link href="/appointments/new" className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700">
          Schedule New
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow border">

        <table className="w-full">
        <thead className="bg-gray-50">
            <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Patient</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Doctor</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date/Time</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
            </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
            {appointmentList.map(({ appointments, patients, doctors }) => (
            <tr key={appointments.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-900 font-medium">{patients.firstName} {patients.lastName}</td>
                <td className="px-6 py-4 text-gray-700">Dr. {doctors.name}<br/>
                <span className="text-sm text-gray-500">{doctors.specialty}</span>
                </td>
                <td className="px-6 py-4 text-gray-700">
                {new Date(appointments.date).toLocaleString([], {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })}
                </td>
                <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    appointments.status === 'scheduled' 
                    ? 'bg-green-100 text-green-800' 
                    : appointments.status === 'completed'
                    ? 'bg-gray-100 text-gray-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                    {appointments.status}
                </span>
                </td>
            </tr>
            ))}
        </tbody>
        </table>

      </div>
    </div>
    </PageContainer>
  );
}