import { Link } from "react-router-dom";
import { useLanguage } from "../i18n/useLanguage";

export function NotFound() {
  const { lang } = useLanguage();

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <p className="text-sm font-bold uppercase tracking-wide text-brand-green-700">404</p>
      <h1 className="mt-2 text-3xl font-black text-brand-navy-900 sm:text-4xl">
        {lang === "ga" ? "Níor aimsíodh an leathanach" : "Page not found"}
      </h1>
      <p className="mt-3 text-base text-brand-navy-800/80">
        {lang === "ga"
          ? "Tá brón orainn, ní féidir linn an leathanach a d'iarr tú a aimsiú."
          : "Sorry, we couldn't find the page you were looking for."}
      </p>
      <Link
        to="/"
        className="mt-8 rounded-md bg-brand-green-700 px-6 py-3 text-base font-bold text-white hover:bg-brand-green-800"
      >
        {lang === "ga" ? "Ar ais go dtí an Baile" : "Back to Home"}
      </Link>
    </div>
  );
}
