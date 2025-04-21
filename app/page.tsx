import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen p-24 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-8 text-primary-800">Healthcare Management System</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/dashboard" className="p-6 border rounded-lg hover:bg-primary-50 transition-colors">
            <h2 className="text-xl font-semibold mb-2 text-primary-700">Dashboard</h2>
            <p className="text-primary-600">System overview & statistics</p>
          </Link>
          <Link href="/patients" className="p-6 border rounded-lg hover:bg-primary-50 transition-colors">
            <h2 className="text-xl font-semibold mb-2 text-primary-700">Patients</h2>
            <p className="text-primary-600">Manage patient records</p>
          </Link>
          <Link href="/appointments" className="p-6 border rounded-lg hover:bg-primary-50 transition-colors">
            <h2 className="text-xl font-semibold mb-2 text-primary-700">Appointments</h2>
            <p className="text-primary-600">Schedule management</p>
          </Link>
          <Link href="/doctors" className="p-6 border rounded-lg hover:bg-primary-50 transition-colors">
            <h2 className="text-xl font-semibold mb-2 text-primary-700">Doctors</h2>
            <p className="text-primary-600">Doctor directory</p>
          </Link>
        </div>
      </div>
    </main>
  )
}














// import Link from 'next/link'

// export default function Home() {
//   return (
//     <main className="min-h-screen p-24">
//       <div className="max-w-4xl mx-auto text-center">
//         <h1 className="text-4xl font-bold mb-8">Healthcare Management System</h1>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <Link href="/dashboard" className="p-6 border rounded-lg hover:bg-gray-100">
//             <h2 className="text-xl font-semibold mb-2">Dashboard</h2>
//             <p className="text-gray-600">View system overview and statistics</p>
//           </Link>
//           <Link href="/patients" className="p-6 border rounded-lg hover:bg-gray-100">
//             <h2 className="text-xl font-semibold mb-2">Patients</h2>
//             <p className="text-gray-600">Manage patient records</p>
//           </Link>
//           <Link href="/appointments" className="p-6 border rounded-lg hover:bg-gray-100">
//             <h2 className="text-xl font-semibold mb-2">Appointments</h2>
//             <p className="text-gray-600">Schedule and manage appointments</p>
//           </Link>
//         </div>
//       </div>
//     </main>
//   )
// }








// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
//           <li className="mb-2">
//             Get started by editing{" "}
//             <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
//               app/page.tsx
//             </code>
//             .
//           </li>
//           <li>Save and see your changes instantly.</li>
//         </ol>

//         <div className="flex gap-4 items-center flex-col sm:flex-row">
//           <a
//             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   );
// }
