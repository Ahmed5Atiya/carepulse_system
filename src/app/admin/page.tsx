// import { DataTable } from "@/components/table/DataTable";
// import StatCard from "@/components/StatCard";
// import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";
// import Image from "next/image";
// import Link from "next/link";
// import { columns } from "@/components/table/columns";

// async function AdminPage() {
//   const appointments = await getRecentAppointmentList();
//   return (
//     <div className="flex flex-col text-white font-mono space-y-14 max-w-7xl mx-auto">
//       <header className=" admin-header">
//         <Link href="/" className=" cursor-pointer">
//           <Image
//             src="/assets/icons/logo-full.svg"
//             alt="adminpage"
//             width={165}
//             height={100}
//             className="w-fit h-6"
//           />
//         </Link>
//         <p className="font-semibold">Admin Dashbord</p>
//       </header>
//       <main className="px-10 flex flex-col gap-16">
//         <section>
//           <h1 className="font-semibold header ">Welcome , Admin </h1>
//           <p className="text-dark-700">
//             start the Day With Maniging the Apointment
//           </p>
//         </section>
//         <section className="admin-stat">
//           <StatCard
//             type="appointments"
//             count={appointments.scheduledCount}
//             label="Scheduled appointments"
//             icons="/assets/icons/appointments.svg"
//           />
//           <StatCard
//             type="pending"
//             count={appointments.pendingCount}
//             label="Pending appointments"
//             icons="/assets/icons/pending.svg"
//           />
//           <StatCard
//             type="cancelled"
//             count={appointments.cancelledCount}
//             label="Cancelled appointments"
//             icons="/assets/icons/cancelled.svg"
//           />
//         </section>
//         <DataTable columns={columns} data={appointments.documents} />
//         {/* <DataTable columns={columns} data={data} /> */}
//       </main>
//     </div>
//   );
// }

// export default AdminPage;
import dynamic from "next/dynamic";
import { DataTable } from "@/components/table/DataTable";
import StatCard from "@/components/StatCard";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";
import Image from "next/image";
import Link from "next/link";
import { columns } from "@/components/table/columns";

const AdminPage = dynamic(
  async () => {
    const appointments = await getRecentAppointmentList();
    return function AdminPageComponent() {
      return (
        <div className="flex flex-col text-white font-mono space-y-14 max-w-7xl mx-auto">
          <header className="admin-header">
            <Link href="/" className="cursor-pointer">
              <Image
                src="/assets/icons/logo-full.svg"
                alt="adminpage"
                width={165}
                height={100}
                className="w-fit h-6"
              />
            </Link>
            <p className="font-semibold">Admin Dashboard</p>
          </header>
          <main className="px-10 flex flex-col gap-16">
            <section>
              <h1 className="font-semibold header">Welcome, Admin</h1>
              <p className="text-dark-700">
                Start the day with managing the appointments
              </p>
            </section>
            <section className="admin-stat">
              <StatCard
                type="appointments"
                count={appointments.scheduledCount}
                label="Scheduled appointments"
                icons="/assets/icons/appointments.svg"
              />
              <StatCard
                type="pending"
                count={appointments.pendingCount}
                label="Pending appointments"
                icons="/assets/icons/pending.svg"
              />
              <StatCard
                type="cancelled"
                count={appointments.cancelledCount}
                label="Cancelled appointments"
                icons="/assets/icons/cancelled.svg"
              />
            </section>
            <DataTable columns={columns} data={appointments.documents} />
          </main>
        </div>
      );
    };
  },
  { ssr: false }
);

export default AdminPage;
