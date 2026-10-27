import type { AnchorHTMLAttributes, ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";

type Tone = "primary" | "secondary";

type ActionLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  tone?: Tone;
  children: ReactNode;
};

export function ActionLink({ tone = "primary", className = "", children, ...props }: ActionLinkProps) {
  return <a className={`action-link action-link--${tone} ${className}`.trim()} {...props}>{children}</a>;
}

type ActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { tone?: Tone };
export function ActionButton({ tone = "primary", className = "", type = "button", ...props }: ActionButtonProps) {
  return <button type={type} className={`action-link action-link--${tone} ${className}`.trim()} {...props} />;
}

export function StatusLabel({ children }: { children: ReactNode }) {
  return <span className="status-label"><span className="status-dot" aria-hidden="true" />{children}</span>;
}

type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id"> & {
  id: string;
  label: string;
  hint?: string;
  error?: string;
};
export function TextField({ id, label, hint, error, className = "", ...props }: TextFieldProps) {
  const descriptionId = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  return (
    <div className={`text-field ${className}`.trim()}>
      <label htmlFor={id}>{label}</label>
      <input id={id} aria-invalid={Boolean(error)} aria-describedby={descriptionId} {...props} />
      {error ? <p id={descriptionId} role="alert" className="field-error">{error}</p>
        : hint ? <p id={descriptionId} className="field-hint">{hint}</p> : null}
    </div>
  );
}

export function SectionEyebrow({ children }: { children: ReactNode }) {
  return <span className="section-eyebrow">{children}</span>;
}

export function InfoChip({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "accent" }) {
  return <span className={`info-chip info-chip--${tone}`}>{children}</span>;
}

/**
 * Estado sem IO ou efeitos. Permite compor histórias da listagem futura sem
 * sugerir que os dados já existem ou que algum filtro está funcional.
 */
export function FeedbackState({
  kind,
  title,
  description,
}: {
  kind: "loading" | "empty" | "error";
  title: string;
  description: string;
}) {
  return (
    <div
      className={`feedback-state feedback-state--${kind}`}
      role={kind === "error" ? "alert" : "status"}
      aria-busy={kind === "loading" ? true : undefined}
    >
      <span className="feedback-state__mark" aria-hidden="true">{kind === "loading" ? "…" : kind === "error" ? "!" : "—"}</span>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}
