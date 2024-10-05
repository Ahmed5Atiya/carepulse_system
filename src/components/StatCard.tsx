import clsx from "clsx";
import Image from "next/image";

interface StatCardProps {
  type: "appointments" | "pending" | "cancelled";
  count: number;
  label: string;
  icons: string;
}
function StatCard({ count = 0, label, icons, type }: StatCardProps) {
  return (
    <div
      className={clsx("stat-card", {
        "bg-appointments": type === "appointments",
        "bg-pending": type === "pending",
        "bg-cancelled": type === "cancelled",
      })}
    >
      <div className="flex items-center gap-5">
        <Image src={icons} alt={type} width={40} height={40} />
        <h2 className="text-32-bold">{count}</h2>
      </div>
      <h3 className="text-14-regular">{label}</h3>
    </div>
  );
}

export default StatCard;
