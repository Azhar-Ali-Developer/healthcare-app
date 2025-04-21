// scripts/seed.ts
//Delete this file...


import { dbPromise } from "@/src/lib/db";
import { patients, doctors, appointments } from "@/src/lib/db/schema";
// import { sql } from "drizzle-orm";

interface PatientInsert {
  firstName: string;
  lastName: string;
  dob: Date;
  gender: string;
  phone: string;
  email: string;
}

interface DoctorInsert {
  name: string;
  specialty: string;
  availability: string;
}

interface AppointmentInsert {
  patientId: number;
  doctorId: number;
  date: Date;
  status: string;
  notes?: string | null;
}

async function seed() {
  console.log("Starting seed...");

  const db = await dbPromise; // Await the database connection
    
  if (!db) {
    throw new Error("Database connection not established."); // Handle connection failure
  }

  // Clear existing data
  await db.delete(appointments);
  await db.delete(patients);
  await db.delete(doctors);

  // Seed Doctors
  const doctorFirstNames = ["James", "Mary", "John", "Patricia", "Robert"];
  const doctorLastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones"];
  const specialties = ["Cardiology", "Dermatology", "Pediatrics", "Orthopedics"];

  const insertedDoctors: number[] = [];
  for (let i = 0; i < 15; i++) {
    const doctorValues: DoctorInsert = {
      name: `${doctorFirstNames[Math.floor(Math.random() * doctorFirstNames.length)]} ${
        doctorLastNames[Math.floor(Math.random() * doctorLastNames.length)]
      }`,
      specialty: specialties[Math.floor(Math.random() * specialties.length)],
      availability: JSON.stringify(
        ["Monday","Tuesday","Wednesday","Thursday","Friday"]
          .sort(() => 0.5 - Math.random())
          .slice(0, 3)
      )
    };

    const result = await db.insert(doctors).values(doctorValues);
    insertedDoctors.push(Number(result.insertId));
  }

  // Seed Patients
  const patientFirstNames = ["David", "Sarah", "Paul", "Laura", "Mark"];
  const patientLastNames = ["Wilson", "Taylor", "Anderson", "Thomas"];
  
  const insertedPatients: number[] = [];
  for (let i = 0; i < 50; i++) {
    const birthDate = new Date();
    birthDate.setFullYear(1960 + Math.floor(Math.random() * 40));
    birthDate.setMonth(Math.floor(Math.random() * 12));
    birthDate.setDate(Math.floor(Math.random() * 28));

    const patientValues: PatientInsert = {
      firstName: patientFirstNames[Math.floor(Math.random() * patientFirstNames.length)],
      lastName: patientLastNames[Math.floor(Math.random() * patientLastNames.length)],
      dob: birthDate,
      gender: Math.random() > 0.5 ? "Male" : "Female",
      phone: `555-${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
      email: `patient${i + 1}@example.com`
    };

    const result = await db.insert(patients).values(patientValues);
    insertedPatients.push(Number(result.insertId));
  }

  // Seed Appointments
  const statuses = ["scheduled", "completed", "canceled"];
  for (let i = 0; i < 100; i++) {
    const appointmentDate = new Date();
    appointmentDate.setDate(appointmentDate.getDate() + Math.floor(Math.random() * 60) - 30);
    
    const appointmentValues: AppointmentInsert = {
      patientId: insertedPatients[Math.floor(Math.random() * insertedPatients.length)],
      doctorId: insertedDoctors[Math.floor(Math.random() * insertedDoctors.length)],
      date: appointmentDate,
      status: statuses[Math.random() > 0.2 ? 0 : Math.random() > 0.5 ? 1 : 2],
      notes: Math.random() > 0.8 ? "Follow-up required" : null
    };

    await db.insert(appointments).values(appointmentValues);
  }

  console.log("Seed completed!");
  console.log(`Created: ${insertedDoctors.length} doctors, ${insertedPatients.length} patients, 100 appointments`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});