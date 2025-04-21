import { NextResponse } from "next/server";
import { getDB, doctors } from "@/src/lib/db/schema";
import { eq } from "drizzle-orm";



//------------------------------------------------------------------------------------------------
export async function GET() {
  try {
  const db = await getDB(); 
  
  console.log("API/Doctors");

    const allDoctors = await db.select().from(doctors);
    return NextResponse.json(allDoctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return NextResponse.json(
      { error: "Failed to fetch doctors" },
      { status: 500 }
    );
  }
}


//------------------------------------------------------------------------------------------------
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.name || !body.specialty || !body.availability) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const db = await getDB(); 

    const newDoctor = await db.insert(doctors).values({
      name: body.name,
      specialty: body.specialty,
      availability: body.availability,
    });

    return NextResponse.json(newDoctor, { status: 201 });
  } catch (error) {
    console.error("Error creating doctor:", error);
    return NextResponse.json(
      { error: "Failed to create doctor" },
      { status: 500 }
    );
  }
}

