//move to gem
import { mysqlTable, varchar, datetime, int, text, boolean } from "drizzle-orm/mysql-core";
import { dbPromise } from "@/src/lib/db";
import { z } from "zod";

//--------------------------------------------------------------------------------------
//Schemas.
//--------------------------------------------------------------------------------------
export const patients = mysqlTable("patients", {
  id: int("id").autoincrement().primaryKey(),
  firstName: varchar("firstName", { length: 50 }).notNull(),
  lastName: varchar("lastName", { length: 50 }).notNull(),
  dob: datetime("dob").notNull(),
  gender: varchar("gender", { length: 10 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  email: varchar("email", { length: 100 }).notNull(),
});

export const doctors = mysqlTable("doctors", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  specialty: varchar("specialty", { length: 100 }).notNull(),
  availability: text("availability").notNull(),
  is_active: boolean('is_active').default(true).notNull(),
  unavailability_dates: text('unavailability_dates'),
});

export const appointments = mysqlTable("appointments", {
  id: int("id").autoincrement().primaryKey(),
  patientId: int("patient_id").references(() => patients.id),
  doctorId: int("doctor_id").references(() => doctors.id),
  date: datetime("date").notNull(),
  status: varchar("status", { length: 20 }).default("scheduled"),
  notes: text("notes"),
});


//--------------------------------------------------------------------------------------
// Define the type for a schemas.
//--------------------------------------------------------------------------------------
export type Patient = typeof patients.$inferSelect;
export type Doctor = typeof doctors.$inferSelect;
export type Appointment = typeof appointments.$inferSelect;


//--------------------------------------------------------------------------------------
//Helper Functions.
//--------------------------------------------------------------------------------------
export async function getDB() {
    const db = await dbPromise; // Await the database connection
    
    if (!db) {
      throw new Error("Database connection not established."); // Handle connection failure
    }

    return db;
}

//--------------------------------------------------------------------------------------
//zod data validation for forms.
//--------------------------------------------------------------------------------------
export const doctorFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  specialty: z.string().min(1, "Specialty is required"),
  availability: z.array(z.string()).nonempty("Select at least one day"),
  // availability: z.string().min(1, "Availability is required"),
  unavailability_dates: z.string().optional(),
  is_active: z.boolean(),
});
