import Image from "next/image";
import { Button } from "@/components/ui/button";

interface ButtonProp {
  isLoading: boolean;
  className?: string;
  children: React.ReactNode;
}
function SubmitButton({ isLoading, className, children }: ButtonProp) {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={className ?? "shad-primary-btn w-full"}
    >
      {isLoading ? (
        <div className="flex items-center gap-6 ">
          <Image
            src="/assets/icons/loader.svg"
            width={24}
            height={24}
            alt="loading"
          />
          Loading....
        </div>
      ) : (
        children
      )}
    </Button>
  );
}

export default SubmitButton;
