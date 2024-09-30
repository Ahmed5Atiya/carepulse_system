import { getAppointment } from "@/lib/actions/appointment.actions";
import Image from "next/image";
import Link from "next/link";
import { string } from "zod";
import { Doctors } from "../../../../../../constant";
import { formatDateTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Success = async ({
  params: { userId },
  searchParams,
}: SearchParamProps) => {
  const appointmentId = (searchParams?.appointmentId as string) || "";
  const apponitment = await getAppointment(appointmentId);
  const doctor = Doctors.find(
    (doctor) => doctor.name === apponitment.primaryPhysician
  );
  console.log("this is the doctor", doctor);
  return (
    <div className="flex h-screen max-h-screen text-white font-mono px-[5%]">
      <div className="success-img">
        <Link href="/">
          <Image
            src="/assets/icons/logo-full.svg"
            width={1000}
            height={1000}
            alt="success page"
            className="h-10 w-fit"
          />
        </Link>
        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            width={400}
            height={400}
            alt="success gif"
          />
          <section className="header mb-6 max-w-[600px] text-center">
            Your <span className="text-green-400">Appointment request</span> has
            been successfully submitted
          </section>
        </section>
        <p>Requested appointment Details :</p>
        <section className="request-details">
          <div className="flex items-center gap-4">
            <Image src={doctor?.image!} alt="doctor" width={50} height={50} />
            <p>Dr . {doctor?.name}</p>
          </div>
          <div className="flex items-center gap-3">
            <Image
              src={"/assets/icons/Calendar.svg"}
              width={30}
              height={30}
              alt="calender"
            />
            <p>{formatDateTime(apponitment.schedule).dateTime}</p>
          </div>
        </section>
        <Button variant="outline" className="shad-primary-btn" asChild>
          <Link href={`/patients/${userId}/new-appointment`}>
            New Appointment
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Success;
