// app/api/doctors/[id]/route.ts
import { NextResponse } from "next/server";
import { getDB, doctors, appointments } from "@/src/lib/db/schema";
import { eq } from "drizzle-orm";


//------------------------------------------------------------------------------------------------
// Get single doctor
export async function GET(_: Request, { params }: { params: { id: string } }) {
  const db = await getDB(); 

  const params1 = await params;
    
  const doctor = await db.select().from(doctors).where(eq(doctors.id, parseInt(params1.id)));
  return NextResponse.json(doctor[0]);
}

//------------------------------------------------------------------------------------------------
// Update doctor
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();
  
  const db = await getDB(); 

  const params1 = await params;
// Parse availability if it's a string
if (typeof body.availability === "object") {
  body.availability = JSON.stringify(body.availability);
}
  const updatedDoctor = await db
    .update(doctors)
    .set(body)
    .where(eq(doctors.id, parseInt(params1.id)));
    return NextResponse.json(updatedDoctor);
  }
  
  //------------------------------------------------------------------------------------------------
  // Delete doctor
  export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    const db = await getDB(); 
    const params1 = await params;

  await db.transaction(async (tx) => {
    await tx.delete(appointments).where(eq(appointments.doctorId, parseInt(params1.id)));
    await tx.delete(doctors).where(eq(doctors.id, parseInt(params1.id)));
  });
  return new Response(null, { status: 204 });
}

//------------------------------------------------------------------------------------------------
// Toggle availability
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const { is_active } = await request.json();
  const db = await getDB(); 

  const params1 = await params;

  await db
    .update(doctors)
    .set({ is_active })
    .where(eq(doctors.id, parseInt(params1.id)));
  return NextResponse.json({ message: "Doctor availability toggled" });
  // return new Response(null, { status: 204 });
}


