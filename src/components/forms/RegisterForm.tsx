"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import CustomFromField from "../CustomFromField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { PatientFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { registerPatient } from "@/lib/actions/patient.actions";

import { Label } from "@radix-ui/react-label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import Image from "next/image";
import { SelectItem } from "../ui/select";
import FileUpLoader from "../FileUpLoader";
import {
  Doctors,
  GenderGroupOptions,
  IdentificationTypes,
  PatientFormDefaultValues,
} from "../../../constant";
export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DARE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}
const RegisterForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  // 1. Define your form.

  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
    setIsLoading(true);
    console.log("Form values submitted:", values);
    let formData;
    if (
      values.identificationDocument &&
      values.identificationDocument.length > 0
    ) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });
      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.identificationDocument[0].name);
    }

    try {
      const patientData = {
        ...values,
        userId: user.$id,
        birthDate: new Date(values.birthDate),
        identificationDocument: formData,
      };
      console.log("Submitting patient data:", patientData);
      //@ts-ignore
      const patient = await registerPatient(patientData);
      console.log("Patient registered:", patient);
      console.log("hellow patient ");
      if (patient) {
        router.push(`/patients/${user.$id}/new-appointment`);
      }
      console.log("hellwo");
    } catch (error) {
      // console.log("Error registering patient:", error);
    }
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
          <h1 className="header"> Welcome 👋</h1>
          <p className="text-dark-700">Tell More About Yourself .</p>
        </section>
        <section className=" space-y-6 ">
          <div className="mb-9 space-y-1">
            <h1 className="sub-header"> Personal Information </h1>
          </div>
        </section>
        <CustomFromField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full Name"
          placeholder="Ahmed Khalid"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />
        <div className="flex xl:flex-row flex-col gap-6 ">
          <CustomFromField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email Address"
            placeholder="example.com"
            iconSrc="/assets/icons/email.svg"
            iconAlt="Email"
          />
          <CustomFromField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="phone"
            label="Phone Number"
            placeholder="+12133734253"
          />
        </div>
        <div className="flex xl:flex-row flex-col gap-6">
          <CustomFromField
            fieldType={FormFieldType.DARE_PICKER}
            control={form.control}
            name="birthDate"
            label="Date of Birth"
          />
          <CustomFromField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="gender"
            label="Gender"
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className="flex h-11 text-white  gap-6 xl:justify-between"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {GenderGroupOptions.map((option, i) => (
                    <div key={option + i} className="radio-group  z-30">
                      <RadioGroupItem
                        value={option}
                        id={option}
                        className=" bg-blue-100 "
                      />
                      <Label htmlFor={option} className="cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>
        <div className="flex xl:flex-row flex-col gap-6">
          <CustomFromField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="address"
            label="Your Address"
            placeholder="Gizay Menof El Menofiya"
          />
          <CustomFromField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="occupation"
            label="Occuption"
            placeholder="Software Engineer"
            iconSrc="/assets/icons/user.svg"
            iconAlt="select"
          />
        </div>
        <div className="flex xl:flex-row flex-col gap-6">
          <CustomFromField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="emergencyContactName"
            label="Emargance Contact Name"
            placeholder="Gizay Menof El Menofiya"
          />
          <CustomFromField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="emergencyContactNumber"
            label="Emargance Contact Phone"
            placeholder="+12133734253"
          />
        </div>
        <section className=" space-y-6 ">
          <div className="mb-9 space-y-1">
            <h1 className="sub-header"> Medical Information </h1>
          </div>
        </section>
        <CustomFromField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="primaryPhysician"
          label="Primary Physician"
          placeholder="Select a Physician"
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
        <div className="flex xl:flex-row flex-col gap-6">
          <CustomFromField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="insuranceProvider"
            label="Insurance Provider"
            placeholder="Gizay Menof El Menofiya"
          />
          <CustomFromField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="insurancePolicyNumber"
            label="Insurance Policy Number"
            placeholder="ABC12133733"
          />
        </div>
        <div className="flex xl:flex-row flex-col gap-6">
          <CustomFromField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="allergies"
            label="Allergies if any"
            placeholder=" Menof El Menofiya"
          />
          <CustomFromField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="currentMedication"
            label="Current Medication"
            placeholder="Algam3a Medication"
          />
        </div>
        <div className="flex xl:flex-row flex-col gap-6">
          <CustomFromField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="familyMedicalHistory"
            label="Family Medical History"
            placeholder="Write The Family Medical"
          />
          <CustomFromField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="pastMedicalHistory"
            label="Past Medical History"
            placeholder="Write the Past Medical History "
          />
        </div>
        <section className=" space-y-6 ">
          <div className="mb-9 space-y-1">
            <h1 className="sub-header"> Identifaction and Verfication </h1>
          </div>
        </section>
        <CustomFromField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="identificationType"
          label="Identifaction Type"
          placeholder="ex. Ahmed Khalid"
        >
          {IdentificationTypes.map((item) => (
            <SelectItem value={item} key={item}>
              {item}
            </SelectItem>
          ))}
        </CustomFromField>
        <CustomFromField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="identificationNumber"
          label="Identifaction Number"
          placeholder="ex. 12345678"
        />
        <CustomFromField
          fieldType={FormFieldType.SKELETON}
          control={form.control}
          name="identificationDocument"
          label="Scanned copy of Identification Document"
          renderSkeleton={(field) => (
            <FormControl>
              <FileUpLoader files={field.value} onChange={field.onChange} />
            </FormControl>
          )}
        />
        <section className=" space-y-6 ">
          <div className="mb-9 space-y-1">
            <h1 className="sub-header"> Consent and Privacy</h1>
          </div>
        </section>
        <CustomFromField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="treatmentConsent"
          label="I consent to Treatment"
        />
        <CustomFromField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="disclosureConsent"
          label="I consent to Disclosure Iformation"
        />
        <CustomFromField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="privacyConsent"
          label="I consent to Privacy Policy"
        />
        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
        {/* <button type="submit">{isLoading ? "hwllowe" : "hi"} Submit</button> */}
      </form>
    </Form>
  );
};

export default RegisterForm;
