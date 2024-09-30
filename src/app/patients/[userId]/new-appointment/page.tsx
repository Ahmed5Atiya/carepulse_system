import AppointmentForm from "@/components/forms/AppointmentForm";
import { getPatient, getUser } from "@/lib/actions/patient.actions";
import Image from "next/image";
import React from "react";

async function NewAppointment({ params: { userId } }: SearchParamProps) {
  const patient = await getPatient(userId);

  return (
    <div className="text-white flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[870px] flex-1 flex-col py-10">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="register"
            width={1000}
            height={1000}
            className="mb-12 h-10 w-fit"
          />
          <AppointmentForm
            type="create"
            userId={userId}
            patientId={patient.$id}
          />
        </div>
      </section>
      <Image
        src="/assets/images/appointment-img.png"
        alt="Image Home"
        width={1000}
        height={1000}
        className="max-w-[390px] object-cover side-img"
      />
    </div>
  );
}

export default NewAppointment;
