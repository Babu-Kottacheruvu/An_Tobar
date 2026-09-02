import { useLanguage } from "../../i18n/useLanguage";
import { socialLinks } from "../../data/social";
import { socialIcons } from "../iconMaps";

interface SocialLinksProps {
  className?: string;
  variant?: "light" | "dark";
}

export function SocialLinks({ className = "", variant = "light" }: SocialLinksProps) {
  const { t } = useLanguage();
  const hoverClass = variant === "dark" ? "hover:bg-white/15" : "hover:bg-brand-navy-800/10";

  return (
    <ul className={`flex items-center gap-1 ${className}`}>
      {socialLinks.map((link) => {
        const Icon = socialIcons[link.id];
        return (
          <li key={link.id}>
            <a
              href="#"
              aria-label={t(link.labelKey)}
              className={`flex h-9 w-9 items-center justify-center rounded-full text-current transition-colors ${hoverClass}`}
            >
              <Icon className="h-5 w-5" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
