import PatintForm from "@/components/forms/PatintForm";
import RegisterForm from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";

async function Register({ params: { userId } }: SearchParamProps) {
  const user = await getUser(userId);
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
          <RegisterForm user={user} />
          <div className="text-14-regular mt-10 flex justify-between">
            <p className="text-dark-600 justify-items-end xl:text-left">
              @ 2024 CarePlus
            </p>
            <Link href="/?admin=true" className="text-green-400">
              Admin
            </Link>
          </div>
        </div>
      </section>
      <Image
        src="/assets/images/register-img.png"
        alt="Image Home"
        width={1000}
        height={1000}
        className="max-w-[50%] h-[100%] side-img"
      />
    </div>
  );
}

export default Register;
