import { dbPromise } from "@/src/lib/db";
import { patients, appointments, doctors } from "@/src/lib/db/schema";
import { count } from "drizzle-orm"; // Import count function
import StatsCard from "@/components/StatsCard";
import PageContainer from '@/components/PageContainer'

export default async function Dashboard() {
  const db = await dbPromise;

  if (!db) {
    throw new Error("Database connection not established.");
  }

  // Properly count rows
  const [patientCount, doctorCount, appointmentCount] = await Promise.all([
    db.select({ count: count() }).from(patients),
    db.select({ count: count() }).from(doctors),
    db.select({ count: count() }).from(appointments),
  ]);

  return (
    <PageContainer>
      <div>
      <h1 className="text-2xl font-bold text-blue-900">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard 
            title="Total Patients" 
            value={patientCount[0]?.count || 0} 
          />
          <StatsCard 
            title="Total Doctors" 
            value={doctorCount[0]?.count || 0} 
          />
          <StatsCard 
            title="Upcoming Appointments" 
            value={appointmentCount[0]?.count || 0} 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Add PatientList and AppointmentList components */}
        </div>
      </div>
    </PageContainer>
  );
}
