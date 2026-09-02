import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../i18n/useLanguage";
import { setAdminAuthenticated } from "../../components/admin/adminAuth";
import { LanguageSwitcher } from "../../components/nav/LanguageSwitcher";
import { TextField, PasswordField } from "../../components/forms/FormField";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DEMO_EMAIL = "eolas@antobar.ie";
const DEMO_PASSWORD = "AnTobar2026";

export function AdminLogin() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState<string | undefined>();
  const [passwordError, setPasswordError] = useState<string | undefined>();
  const [submitting, setSubmitting] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    let hasError = false;
    if (!email.trim()) {
      setEmailError(t("admin.login.emailRequired"));
      hasError = true;
    } else if (!EMAIL_PATTERN.test(email.trim())) {
      setEmailError(t("admin.login.emailInvalid"));
      hasError = true;
    } else {
      setEmailError(undefined);
    }

    if (!password) {
      setPasswordError(t("admin.login.passwordRequired"));
      hasError = true;
    } else {
      setPasswordError(undefined);
    }

    if (hasError) return;

    setSubmitting(true);
    window.setTimeout(() => {
      setAdminAuthenticated(true);
      navigate("/admin");
    }, 500);
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-brand-navy-900 px-4 py-12">
      <div className="absolute right-4 top-4 sm:right-6 sm:top-6">
        <LanguageSwitcher />
      </div>

      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-xl sm:p-10">
        <div className="flex flex-col items-center text-center">
          <span
            className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-green-800 text-lg font-bold text-white"
            aria-hidden="true"
          >
            AT
          </span>
          <h1 className="mt-4 text-2xl font-black text-brand-navy-900">{t("admin.login.title")}</h1>
          <p className="mt-2 text-sm text-brand-navy-800/70">{t("admin.login.intro")}</p>
        </div>

        <div className="mt-6 rounded-md border border-brand-gold-500/40 bg-brand-gold-50 p-4 text-sm">
          <p className="font-bold text-brand-navy-900">{t("admin.login.demoHeading")}</p>
          <p className="mt-1 text-brand-navy-800/80">{t("admin.login.demoIntro")}</p>
          <p className="mt-2 font-mono text-xs text-brand-navy-900">
            {t("admin.login.emailLabel")}: {DEMO_EMAIL}
            <br />
            {t("admin.login.passwordLabel")}: {DEMO_PASSWORD}
          </p>
          <button
            type="button"
            onClick={() => {
              setEmail(DEMO_EMAIL);
              setPassword(DEMO_PASSWORD);
              setEmailError(undefined);
              setPasswordError(undefined);
            }}
            className="mt-3 rounded-md border border-brand-gold-600 px-3 py-1.5 text-xs font-bold text-brand-gold-600 hover:bg-brand-gold-100"
          >
            {t("admin.login.useDemoCredentials")}
          </button>
        </div>

        <form className="mt-6 flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
          <TextField
            label={t("admin.login.emailLabel")}
            type="email"
            value={email}
            onChange={setEmail}
            required
            error={emailError}
          />
          <PasswordField
            label={t("admin.login.passwordLabel")}
            value={password}
            onChange={setPassword}
            required
            error={passwordError}
            autoComplete="current-password"
          />

          <button
            type="submit"
            disabled={submitting}
            className="mt-1 rounded-md bg-brand-green-800 px-4 py-3 text-base font-bold text-white hover:bg-brand-green-900 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? t("admin.login.signingIn") : t("admin.login.signIn")}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setForgotOpen(true)}
              className="rounded text-sm font-bold text-brand-green-800 underline-offset-2 hover:underline"
            >
              {t("admin.login.forgotPassword")}
            </button>
            {forgotOpen && (
              <p role="status" className="mt-2 text-sm text-brand-navy-800/70">
                {t("admin.login.forgotPasswordConfirmation")}
              </p>
            )}
          </div>
        </form>
      </div>

      <p className="mt-6 text-center text-sm font-semibold text-white/70">
        {t("admin.login.authorisedOnly")}
      </p>
    </div>
  );
}
