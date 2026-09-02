import { useId, useState, type ChangeEvent, type ReactNode } from "react";
import { useLanguage } from "../../i18n/useLanguage";
import { EyeIcon, EyeOffIcon } from "../icons";

interface FieldWrapperProps {
  label: string;
  required?: boolean;
  error?: string;
  htmlFor: string;
  children: (describedBy: string | undefined) => ReactNode;
}

function FieldWrapper({ label, required, error, htmlFor, children }: FieldWrapperProps) {
  const { t } = useLanguage();
  const errorId = `${htmlFor}-error`;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-bold text-brand-navy-900">
        {label}
        {required && (
          <>
            <span aria-hidden="true" className="ml-0.5 text-brand-green-800">
              *
            </span>
            <span className="sr-only"> ({t("common.required")})</span>
          </>
        )}
      </label>
      {children(error ? errorId : undefined)}
      {error && (
        <p id={errorId} role="alert" className="text-sm font-semibold text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email";
  required?: boolean;
  error?: string;
  placeholder?: string;
}

export function TextField({
  label,
  value,
  onChange,
  type = "text",
  required,
  error,
  placeholder,
}: TextFieldProps) {
  const id = useId();

  return (
    <FieldWrapper label={label} required={required} error={error} htmlFor={id}>
      {(describedBy) => (
        <input
          id={id}
          type={type}
          value={value}
          required={required}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
          className="rounded-md border border-brand-navy-800/25 px-3 py-2.5 text-base text-brand-navy-900 focus:border-brand-green-700"
        />
      )}
    </FieldWrapper>
  );
}

interface PasswordFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
  autoComplete?: string;
}

export function PasswordField({
  label,
  value,
  onChange,
  required,
  error,
  autoComplete,
}: PasswordFieldProps) {
  const { t } = useLanguage();
  const id = useId();
  const [visible, setVisible] = useState(false);

  return (
    <FieldWrapper label={label} required={required} error={error} htmlFor={id}>
      {(describedBy) => (
        <div className="relative">
          <input
            id={id}
            type={visible ? "text" : "password"}
            value={value}
            required={required}
            autoComplete={autoComplete}
            aria-invalid={Boolean(error)}
            aria-describedby={describedBy}
            onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
            className="w-full rounded-md border border-brand-navy-800/25 px-3 py-2.5 pr-11 text-base text-brand-navy-900 focus:border-brand-green-700"
          />
          <button
            type="button"
            onClick={() => setVisible((current) => !current)}
            aria-label={visible ? t("admin.login.hidePassword") : t("admin.login.showPassword")}
            aria-pressed={visible}
            className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded text-brand-navy-800/60 hover:bg-brand-navy-50"
          >
            {visible ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
          </button>
        </div>
      )}
    </FieldWrapper>
  );
}

interface TextAreaFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
  rows?: number;
}

export function TextAreaField({
  label,
  value,
  onChange,
  required,
  error,
  rows = 4,
}: TextAreaFieldProps) {
  const id = useId();

  return (
    <FieldWrapper label={label} required={required} error={error} htmlFor={id}>
      {(describedBy) => (
        <textarea
          id={id}
          value={value}
          required={required}
          rows={rows}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          onChange={(event) => onChange(event.target.value)}
          className="rounded-md border border-brand-navy-800/25 px-3 py-2.5 text-base text-brand-navy-900 focus:border-brand-green-700"
        />
      )}
    </FieldWrapper>
  );
}

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  required?: boolean;
  error?: string;
}

export function SelectField({
  label,
  value,
  onChange,
  options,
  required,
  error,
}: SelectFieldProps) {
  const id = useId();

  return (
    <FieldWrapper label={label} required={required} error={error} htmlFor={id}>
      {(describedBy) => (
        <select
          id={id}
          value={value}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          onChange={(event) => onChange(event.target.value)}
          className="rounded-md border border-brand-navy-800/25 bg-white px-3 py-2.5 text-base text-brand-navy-900 focus:border-brand-green-700"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    </FieldWrapper>
  );
}

interface CheckboxFieldProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function CheckboxField({ label, checked, onChange }: CheckboxFieldProps) {
  const id = useId();

  return (
    <div className="flex items-center gap-2.5">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-5 w-5 shrink-0 accent-brand-green-700"
      />
      <label htmlFor={id} className="text-sm font-semibold text-brand-navy-900">
        {label}
      </label>
    </div>
  );
}
