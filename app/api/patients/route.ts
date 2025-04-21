import { NextResponse } from "next/server";
import { dbPromise } from "@/src/lib/db";
import { patients } from "@/src/lib/db/schema";
import { eq } from "drizzle-orm";


export async function GET() {
  try {
    const db = await dbPromise; // Await the database connection
    
    if (!db) {
      throw new Error("Database connection not established."); // Handle connection failure
    }

    const allPatients = await db.select().from(patients);
    return NextResponse.json(allPatients);
  } catch (error) {
    console.error("Error fetching patients:", error);
    return NextResponse.json(
      { error: "Failed to fetch patients" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const db = await dbPromise; // Await the database connection
    
    if (!db) {
      throw new Error("Database connection not established."); // Handle connection failure
    }

    const body = await request.json();
    
    // Basic validation
    if (!body.firstName || !body.lastName || !body.email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newPatient = await db.insert(patients).values(body);
    return NextResponse.json(newPatient, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create patient" },
      { status: 500 }
    );
    console.log("POST() Error: " + error);
  }
}

export async function PUT(request: Request) {
  console.log("PUT() called");
  
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.id || !body.firstName || !body.lastName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const db = await dbPromise; // Await the database connection
    
    if (!db) {
      throw new Error("Database connection not established."); // Handle connection failure
    }

    // Update patient in database
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
      .where(eq(patients.id, body.id));

    return NextResponse.json(updatedPatient);
  } catch (error) {
    console.error("Error creating doctor:", error);
    return NextResponse.json(
      { error: "Failed to update patient" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Patient ID is required" },
        { status: 400 }
      );
    }

    const db = await dbPromise; // Await the database connection
    
    if (!db) {
      throw new Error("Database connection not established."); // Handle connection failure
    }

    // Delete patient from database
    await db.delete(patients).where(eq(patients.id, parseInt(id)));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error creating doctor:", error);
    return NextResponse.json(
      { error: "Failed to delete patient" },
      { status: 500 }
    );
  }
}
