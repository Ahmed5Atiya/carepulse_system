import PatintForm from "@/components/forms/PatintForm";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import PassKeyModel from "@/components/PassKeyModel";
import Link from "next/link";
export default function Home({ searchParams }: SearchParamProps) {
  console.log(searchParams);
  const isAdmin = searchParams.admin === "true";
  return (
    <div className="flex max-h-screen  h-screen">
      {isAdmin && <PassKeyModel />}
      <section className="container remove-scrollbar my-auto">
        <div className="sub-container max-w[450px]">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="Logo"
            width={1000}
            height={1000}
            className="mb-10 h-10 w-fit"
          />
        </div>
        <PatintForm />
        <div className="text-14-regular mt-10 flex justify-between">
          <p className="text-dark-600 justify-items-end xl:text-left">
            @ 2024 CarePlus
          </p>
          <Link href="/?admin=true" className="text-green-400">
            Admin
          </Link>
        </div>
      </section>
      <Image
        src="/assets/images/onboarding-img.png"
        alt="Image Home"
        width={1000}
        height={1000}
        className="max-w-[50%] h-[100%] side-img"
      />
    </div>
  );
}
