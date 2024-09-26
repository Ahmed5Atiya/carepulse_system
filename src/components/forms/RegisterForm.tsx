"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import CustomFromField from "../CustomFromField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";
import { Doctors, GenderGroupOptions } from "../../../constant";
import { Label } from "@radix-ui/react-label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import Image from "next/image";
import { SelectItem } from "../ui/select";

// import { FormFieldType } from "./PatintForm";
export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DARE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}
export function RegisterForm({ user }: { user: User }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit({
    email,
    name,
    phone,
  }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);
    try {
      const userData = {
        name,
        email,
        phone,
      };
      // console.log(userData);
      const newUser = await createUser(userData);
      if (newUser) {
        router.push(`/patients/${newUser.$id}/register`);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
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
            name="birthData"
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
                  className="flex h-11 gap-6 xl:justify-between"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {GenderGroupOptions.map((option, i) => (
                    <div
                      key={option + i}
                      className="radio-group text-white z-30"
                    >
                      <RadioGroupItem value={option} id={option} />
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
            name="emarganceContactName"
            label="Emargance Contact Name"
            placeholder="Gizay Menof El Menofiya"
          />
          <CustomFromField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="emarganceContactPhone"
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
        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
}

export default RegisterForm;
