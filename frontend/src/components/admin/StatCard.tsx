import type { ReactElement } from "react";
import type { IconProps } from "../icons";

interface StatCardProps {
  label: string;
  value: number | string;
  icon: (props: IconProps) => ReactElement;
  accentClass?: string;
}

export function StatCard({ label, value, icon: Icon, accentClass = "bg-brand-green-50 text-brand-green-800" }: StatCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-brand-navy-800/12 bg-white p-5">
      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${accentClass}`}>
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-2xl font-black text-brand-navy-900">{value}</p>
        <p className="text-sm font-semibold text-brand-navy-800/70">{label}</p>
      </div>
    </div>
  );
}
