import { DocumentIcon } from "../../icons";
import { navIconRegistry } from "./navIconRegistry";

export function NavIcon({ icon, className }: { icon: string; className?: string }) {
  const Icon = navIconRegistry[icon] ?? DocumentIcon;
  return <Icon className={className} />;
}
