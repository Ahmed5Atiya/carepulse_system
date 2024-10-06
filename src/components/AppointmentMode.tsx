"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { useState } from "react";
import AppointmentForm from "./forms/AppointmentForm";
import { Appointment } from "../../types/appwrite.types";
function AppointmentMode({
  type,
  patientId,
  userId,
  appointment,
  title,
  description,
}: {
  type: "schedule" | "cancel";
  patientId: string;
  userId: string;
  title: string;
  description: string;
  appointment: Appointment;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="font-mono">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className={`${
              type === "schedule" ? "text-green-500" : "text-red-500"
            } capitalize`}
          >
            {type}
          </Button>
        </DialogTrigger>
        <DialogContent className="shad-dialog sm:max-w-md text-white">
          <DialogHeader className="mb-7 space-y-4">
            <DialogTitle className="capitalize">{type} Appointment</DialogTitle>
            <DialogDescription>
              please fil and folowing details of the {type} an appointment
            </DialogDescription>
          </DialogHeader>
          <AppointmentForm
            userId={userId}
            type={type}
            appointment={appointment}
            setOpen={setOpen}
            patientId={userId}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AppointmentMode;
