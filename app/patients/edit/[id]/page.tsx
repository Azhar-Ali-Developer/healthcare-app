// app/patients/edit/[id]/page.tsx
import PatientForm from "components/PatientForm";

export default async function EditPatientPage({
  params,
}: {
  params: { id: string };
}) {

  // console.log("params->",params);

  const params1 = await params;
  
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-700">Edit Patient</h1>
      <PatientForm patientId={params1.id} />
    </div>
  );
}
