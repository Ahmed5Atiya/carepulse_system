"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { decryptKey, encryptKey } from "@/lib/utils";

const PassKeyModel = () => {
  const [open, setOpen] = useState(false);
  const [passKey, setPassKey] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const path = usePathname();
  const encreptedKey =
    typeof window !== "undefined"
      ? window.localStorage.getItem("accessKey")
      : null;

  useEffect(() => {
    const accessKey = encreptedKey && decryptKey(encreptedKey);
    if (path) {
      if (accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
        const encreptedKey = encryptKey(passKey);
        window.localStorage.setItem("accessKey", encreptedKey);
        setOpen(false);
        router.push("/admin");
      } else {
        setOpen(true);
      }
    }
  }, [encreptedKey]);
  const Validation = (e) => {
    e.preventDefault();
    console.log(passKey);
    if (passKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      const encreptedKey = encryptKey(passKey);
      window.localStorage.setItem("accessKey", encreptedKey);
      setOpen(false);
      router.push("/admin");
    } else {
      setError("invalidPassKey  Try Again");
    }
  };
  const CloseModel = () => {
    setOpen(false);
    router.push("/");
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="space-y-5 z-50 font-mono border-dark-500 outline-none text-white bg-dark-400">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center justify-between">
            Are you absolutely sure?
            <Image
              src="/assets/icons/close.svg"
              width={24}
              height={24}
              alt="close"
              className=" cursor-pointer"
              onClick={() => CloseModel()}
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <InputOTP
            maxLength={6}
            className=" w-full flex  justify-between"
            value={passKey}
            onChange={(value) => setPassKey(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot className="shad-otp-slot " index={0} />
              <InputOTPSlot className="shad-otp-slot " index={1} />
              <InputOTPSlot className="shad-otp-slot " index={2} />
              <InputOTPSlot className="shad-otp-slot " index={3} />
              <InputOTPSlot className="shad-otp-slot " index={4} />
              <InputOTPSlot className="shad-otp-slot " index={5} />
            </InputOTPGroup>
          </InputOTP>
          {error && <p className=" mt-10 shad-error">{error}</p>}
        </div>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={(e) => Validation(e)}
            className="shad-primary-btn w-full"
          >
            Enter Admin PassKey
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default PassKeyModel;
