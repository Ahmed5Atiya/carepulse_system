"use client";
import React, { useState } from "react";
import { Form } from "../ui/form";
import {
  CreateAppointmentSchema,
  getAppointmentSchema,
  PatientFormValidation,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Doctors, PatientFormDefaultValues } from "../../../constant";
import { useForm } from "react-hook-form";
import CustomFromField from "../CustomFromField";
import Image from "next/image";
import { SelectItem } from "../ui/select";
import { FormFieldType } from "./PatintForm";
import SubmitButton from "../SubmitButton";
import { tree } from "next/dist/build/templates/app-page";
import { createAppointment } from "@/lib/actions/appointment.actions";

function AppointmentForm({
  userId,
  patientId,
  type,
}: {
  userId: string;
  patientId: string;
  type: "create" | "cancel" | "schedule";
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  // 1. Define your form.
  const AppointmentFormValidation = getAppointmentSchema(type);
  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: "",
      schedule: new Date(),
      reason: "",
      note: "",
      cancellationReason: "",
    },
  });

  async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
    setIsLoading(true);
    console.log(values);
    let status;
    switch (type) {
      case "schedule":
        status = "scheduled";
        break;
      case "cancel":
        status = "cancelled";
        break;
      default:
        status = "pending";
        break;
    }

    try {
      if (type === "create" && patientId) {
        const appointemntData = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason!,
          note: values.note,
          status: status as Status,
        };

        const appointment = await createAppointment(appointemntData);
        console.log(appointment);
        if (appointment) {
          form.reset();
          router.push(
            `/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`
          );
        }
      }
    } catch (error) {}
  }

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          form.handleSubmit(onSubmit)(e);
          console.log("Form submitted");
        }}
        className="space-y-12 flex-1"
      >
        <section className=" space-y-12 flex-1">
          <h1 className="header"> New Appointment 👋</h1>
          <p className="text-dark-700">Tell More About Yourself .</p>
        </section>
        {type !== "cancel" && (
          <>
            <CustomFromField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="primaryPhysician"
              label="Doctor"
              placeholder="Select a Doctor"
            >
              {Doctors.map((item) => (
                <SelectItem value={item.name} key={item.name}>
                  <div className="flex gap-2 items-center cursor-pointer">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={24}
                      height={24}
                    />
                    <p>{item.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFromField>
            <div className="flex gap-3 xl:flex-row flex-col">
              <CustomFromField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="reason"
                label="Resoins For Appointment"
                placeholder=" Write The Resoins For Appointment"
              />
              <CustomFromField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="note"
                label="Resoins For Appointment"
                placeholder=" Write The Resoins For Appointment"
              />
            </div>
            <CustomFromField
              fieldType={FormFieldType.DARE_PICKER}
              control={form.control}
              name="schedule"
              label="Select Your Appointment Date"
              showTimeSelect
              placeholder="Select Your Appointment Date"
              dataFormat="MM/dd/yyyy - h:mm aa"
            />
          </>
        )}
        {type === "cancel" && (
          <CustomFromField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="cansellationReason"
            label="Resoins For Cansellation"
            placeholder=" Write The Resoins For Cancel"
          />
        )}
        <SubmitButton
          isLoading={isLoading}
          className={`${
            type === "cancel" ? "shad-dander-btn" : "shad-primary-btn"
          } w-full `}
        >
          Submit and Continue
        </SubmitButton>
      </form>
    </Form>
  );
}

export default AppointmentForm;
