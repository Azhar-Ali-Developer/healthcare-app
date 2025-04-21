import { NextResponse } from "next/server";
import { dbPromise } from "@/src/lib/db";
import { patients, appointments } from "@/src/lib/db/schema";
import { eq } from "drizzle-orm";




export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Validate ID
    const params1 = await params;
    const patientId = parseInt(params1.id);
    if (isNaN(patientId)) {
      return NextResponse.json(
        { error: "Invalid patient ID" },
        { status: 400 }
      );
    }

    const db = await dbPromise;

    if (!db) {
    throw new Error("Database connection not established.");
    }

    // Use transaction to ensure data consistency
    await db.transaction(async (tx) => {
      // First delete related appointments
      await tx.delete(appointments)
        .where(eq(appointments.patientId, patientId));

      // Then delete the patient
      await tx.delete(patients)
        .where(eq(patients.id, patientId));
    });

    // Verify patient was actually deleted
    const [exists] = await db.select()
      .from(patients)
      .where(eq(patients.id, patientId));

    if (exists) {
      return NextResponse.json(
        { error: "Failed to delete patient" },
        { status: 500 }
      );
    }

    return new Response(null, { status: 204 });
    
  } catch (error) {
    console.error("Error deleting patient:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function xDELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Validate ID
    const params1 = await params;
    const patientId = parseInt(params1.id);
    if (isNaN(patientId)) {
      return NextResponse.json(
        { error: "Invalid patient ID" },
        { status: 400 }
      );
    }

    const db = await dbPromise;

    if (!db) {
    throw new Error("Database connection not established.");
    }

    console.log("patients.id, patientId =>", patients.id, patientId);


    // Delete patient from database
    await db.delete(patients).where(eq(patients.id, patientId));

    // Return success with 204 No Content status
    return new Response(null, { status: 204 });
    
  } catch (error) {
    console.error("Error deleting patient:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}





// PUT - Update existing patient
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Validate ID
    const params1 = await params;
    const patientId = parseInt(params1.id);
    if (isNaN(patientId)) {
      return NextResponse.json(
        { error: "Invalid patient ID" },
        { status: 400 }
      );
    }

    // Validate request body
    const body = await request.json();
    if (!body.firstName || !body.lastName || !body.dob) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const db = await dbPromise;

    if (!db) {
    throw new Error("Database connection not established.");
    }
 
    // Update patient
    const updatedPatient = await db
      .update(patients)
      .set({
        firstName: body.firstName,
        lastName: body.lastName,
        dob: new Date(body.dob),
        gender: body.gender,
        phone: body.phone,
        email: body.email
      })
      .where(eq(patients.id, patientId));

    return NextResponse.json(updatedPatient);
  } catch (error) {
    console.error("Error updating patient:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}





// GET - Get single patient (keep existing)
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const params1 = await params;
    const patientId = parseInt(params1.id);
    if (isNaN(patientId)) {
      return NextResponse.json(
        { error: "Invalid patient ID" },
        { status: 400 }
      );
    }

    const db = await dbPromise;

    if (!db) {
    throw new Error("Database connection not established.");
    }
 
    const patient = await db
      .select()
      .from(patients)
      .where(eq(patients.id, patientId));

    if (!patient[0]) {
      return NextResponse.json(
        { error: "Patient not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(patient[0]);
  } catch (error) {
    console.error("Error fetching patient:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}