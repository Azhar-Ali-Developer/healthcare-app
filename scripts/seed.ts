import { dbPromise } from "@/src/lib/db";
import { patients, doctors, appointments } from "@/src/lib/db/schema";
import * as dotenv from 'dotenv';

dotenv.config();

//---------------------------------------------------------------------------------------------------
async function seed() {
  const db = await dbPromise;

  console.log("Starting seed...");

  // Clear existing data
  await db.delete(appointments);
  await db.delete(patients);
  await db.delete(doctors);

  // Seed Doctors - FIXED INSERT ID HANDLING
  const doctorFirstNames = ["James", "Mary", "John", "Patricia", "Robert"];
  const doctorLastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones"];
  const specialties = ["Cardiology", "Dermatology", "Pediatrics", "Orthopedics"];

//-----------------------------------------------------------------
  const insertedDoctors: number[] = [];
  for (let i = 0; i < 15; i++) {
    const result = await db.insert(doctors).values({
      name: `${doctorFirstNames[i % 5]} ${doctorLastNames[i % 4]}`, 
      specialty: specialties[i % 4],
      availability: JSON.stringify(["Monday", "Wednesday", "Friday"]),
      is_active: true,
      unavailability_dates: JSON.stringify([])
    });
    insertedDoctors.push(result[0].insertId); // CHANGED TO USE INSERT RESULT
  }

  //-----------------------------------------------------------------
  // Seed Patients - FIXED INSERT ID HANDLING
  const patientFirstNames = ["David", "Sarah", "Paul", "Laura", "Mark"];
  const patientLastNames = ["Wilson", "Taylor", "Anderson", "Thomas"];
  
  //-----------------------------------------------------------------
  const insertedPatients: number[] = [];
  for (let i = 0; i < 50; i++) {
    const birthDate = new Date(1980 + (i % 30), (i % 12), (i % 28));
    
    const result = await db.insert(patients).values({
      firstName: patientFirstNames[i % 5],
      lastName: patientLastNames[i % 4],
      dob: birthDate,
      gender: i % 2 ? "Female" : "Male",
      phone: `555-${100 + i}-${1000 + i}`,
      email: `patient${i}@example.com`
    });
    insertedPatients.push(result[0].insertId); // CHANGED TO USE INSERT RESULT
  }

  //-----------------------------------------------------------------
  // Seed Appointments
  for (let i = 0; i < 100; i++) {
    await db.insert(appointments).values({
      patientId: insertedPatients[i % 50],
      doctorId: insertedDoctors[i % 15],
      date: new Date(Date.now() + (i * 86400000)),
      status: i % 10 === 0 ? "completed" : "scheduled",
      notes: i % 5 === 0 ? "Follow-up needed" : null
    });
  }

  console.log("Seed completed!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});

