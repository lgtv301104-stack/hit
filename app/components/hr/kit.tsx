import { IconAlertCircle, IconInbox, IconLoader2 } from "@tabler/icons-react";
import { useEffect } from "react";
import type { ReactNode } from "react";

import type { AsyncState } from "@/lib/hooks/use-async";

export const STATUS_BADGE: Record<string, string> = {
  pending: "bg-[#F59E0B]/10 text-[#F59E0B]",
  in_progress: "bg-[#F59E0B]/10 text-[#F59E0B]",
  processing: "bg-[#F59E0B]/10 text-[#F59E0B]",
  open: "bg-[#F3F4F6] text-[#6B7280]",
  approved: "bg-[#10B981]/10 text-[#10B981]",
  completed: "bg-[#10B981]/10 text-[#10B981]",
  paid: "bg-[#10B981]/10 text-[#10B981]",
  active: "bg-[#10B981]/10 text-[#10B981]",
  finalized: "bg-[#10B981]/10 text-[#10B981]",
  success: "bg-[#10B981]/10 text-[#10B981]",
  rejected: "bg-[#FEF2F2] text-[#B91C1C]",
  failed: "bg-[#FEF2F2] text-[#B91C1C]",
  unavailable: "bg-[#FEF2F2] text-[#B91C1C]",
  cancelled: "bg-[#F3F4F6] text-[#6B7280]",
  inactive: "bg-[#F3F4F6] text-[#6B7280]",
  calculated: "bg-[#2563EB]/10 text-[#2563EB]",
  validated: "bg-[#2563EB]/10 text-[#2563EB]",
};

export function Badge({ status, label }: { status: string; label?: string }) {
  return (
    <span
      className={`inline-block shrink-0 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.5px] ${STATUS_BADGE[status] ?? "bg-[#F3F4F6] text-[#6B7280]"}`}
    >
      {label ?? status.replace("_", " ")}
    </span>
  );
}

const inputBase =
  "w-full rounded-lg border bg-white px-3 py-3 text-sm text-[#111827] outline-none placeholder:text-[#9CA3AF] focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20";

export function Field({ label, error, hint, children }: { label: string; error?: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-semibold text-[#4B5563]">{label}</span>
      {children}
      {hint && !error && <span className="block text-[11px] text-[#9CA3AF]">{hint}</span>}
      {error && (
        <span role="alert" className="block text-[11px] font-semibold text-[#EF4444]">
          {error}
        </span>
      )}
    </label>
  );
}

export function TextInput({ invalid, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }) {
  return <input {...props} className={`${inputBase} ${invalid ? "border-[#EF4444]" : "border-[#D1D5DB]"} ${props.className ?? ""}`} />;
}

export function TextArea({ invalid, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean }) {
  return <textarea rows={4} {...props} className={`${inputBase} resize-none ${invalid ? "border-[#EF4444]" : "border-[#D1D5DB]"}`} />;
}

export function Select({ invalid, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean }) {
  return (
    <select {...props} className={`${inputBase} ${invalid ? "border-[#EF4444]" : "border-[#D1D5DB]"}`}>
      {children}
    </select>
  );
}

type Variant = "primary" | "secondary" | "danger" | "dangerSolid" | "navy" | "ghost";
const variants: Record<Variant, string> = {
  primary: "bg-[#2563EB] text-white shadow-lg shadow-[#2563EB]/20",
  secondary: "border border-[#E5E7EB] bg-white text-[#374151]",
  danger: "border border-[#EF4444] bg-white text-[#EF4444]",
  dangerSolid: "bg-[#EF4444] text-white shadow-lg shadow-[#EF4444]/20",
  navy: "bg-[#1A2B4B] text-white",
  ghost: "bg-[#F3F4F6] text-[#374151]",
};

export function Button({
  variant = "primary",
  loading,
  className = "",
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; loading?: boolean }) {
  return (
    <button
      {...props}
      disabled={props.disabled || loading}
      className={`flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-4 text-sm font-bold disabled:opacity-60 ${variants[variant]} ${className}`}
    >
      {loading && <IconLoader2 size={16} className="animate-spin" />}
      {children}
    </button>
  );
}

export function Tabs<T extends string>({
  tabs,
  value,
  onChange,
  variant = "underline",
}: {
  tabs: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  variant?: "underline" | "pill";
}) {
  if (variant === "pill") {
    return (
      <div className="flex gap-2 overflow-x-auto pb-1" role="tablist">
        {tabs.map((t) => (
          <button
            key={t.value}
            role="tab"
            aria-selected={value === t.value}
            onClick={() => onChange(t.value)}
            className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium ${value === t.value ? "bg-[#2563EB] text-white" : "border border-[#E5E7EB] bg-white text-[#6B7280]"}`}
          >
            {t.label}
          </button>
        ))}
      </div>
    );
  }
  return (
    <div className="flex gap-6 overflow-x-auto border-b border-[#E5E7EB]" role="tablist">
      {tabs.map((t) => (
        <button
          key={t.value}
          role="tab"
          aria-selected={value === t.value}
          onClick={() => onChange(t.value)}
          className={`-mb-px shrink-0 border-b-2 pb-2.5 text-sm font-semibold ${value === t.value ? "border-[#2563EB] text-[#2563EB]" : "border-transparent text-[#6B7280]"}`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

export function Loading({ label = "Loading..." }: { label?: string }) {
  return (
    <div role="status" className="flex items-center justify-center gap-2 py-12 text-sm text-[#6B7280]">
      <IconLoader2 size={18} className="animate-spin" /> {label}
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div role="alert" className="mx-4 my-6 rounded-2xl border border-[#EF4444]/20 bg-[#EF4444]/5 p-5 text-center">
      <IconAlertCircle className="mx-auto text-[#EF4444]" size={28} />
      <p className="mt-2 text-sm font-semibold text-[#B91C1C]">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="mt-3 rounded-lg bg-white px-4 py-2 text-xs font-bold text-[#B91C1C] shadow-sm">
          Try again
        </button>
      )}
    </div>
  );
}

export function Empty({ title, hint, action }: { title: string; hint?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-2 px-6 py-12 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-[#F3F4F6] text-[#9CA3AF]">
        <IconInbox size={26} />
      </span>
      <p className="text-sm font-bold text-[#1A2B4B]">{title}</p>
      {hint && <p className="text-xs text-[#6B7280]">{hint}</p>}
      {action}
    </div>
  );
}

export function AsyncView<T>({ state, children, empty }: { state: AsyncState<T>; children: (data: T) => ReactNode; empty?: (data: T) => boolean }) {
  if (state.loading && !state.data) return <Loading />;
  if (state.error) return <ErrorState message={state.error} onRetry={state.reload} />;
  if (state.data === null) return null;
  return <>{children(state.data)}</>;
}

export function Banner({ tone, children }: { tone: "error" | "success" | "info" | "warn"; children: ReactNode }) {
  const t = {
    error: "border-[#EF4444]/20 bg-[#EF4444]/10 text-[#EF4444]",
    success: "border-[#10B981]/20 bg-[#10B981]/10 text-[#047857]",
    info: "border-[#2563EB]/20 bg-[#EFF6FF] text-[#1D4ED8]",
    warn: "border-[#F59E0B]/30 bg-[#FEF3C7] text-[#92400E]",
  }[tone];
  return (
    <div role={tone === "error" ? "alert" : "status"} className={`rounded-xl border px-4 py-3 text-sm font-semibold ${t}`}>
      {children}
    </div>
  );
}

export function ConfirmSheet({
  open,
  title,
  message,
  confirmLabel,
  tone = "danger",
  loading,
  icon,
  onConfirm,
  onCancel,
  children,
}: {
  open: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  tone?: "danger" | "primary";
  loading?: boolean;
  icon?: ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  children?: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onCancel();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onCancel]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 sm:items-center" onClick={onCancel}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[480px] space-y-5 rounded-t-[32px] bg-white px-6 pb-8 pt-2 shadow-[0_-10px_40px_rgba(0,0,0,0.2)] sm:rounded-[32px]"
      >
        <div className="mx-auto h-1.5 w-12 rounded-full bg-[#E5E7EB]" />
        <div className="flex flex-col items-center gap-2 text-center">
          {icon && (
            <span className={`flex size-16 items-center justify-center rounded-full ${tone === "danger" ? "bg-[#FEF2F2] text-[#EF4444]" : "bg-[#EFF6FF] text-[#2563EB]"}`}>{icon}</span>
          )}
          <h2 className="text-2xl font-bold text-[#1A2B4B]">{title}</h2>
          <p className="px-2 text-sm leading-relaxed text-[#6B7280]">{message}</p>
        </div>
        {children}
        <div className="space-y-3">
          <Button variant={tone === "danger" ? "dangerSolid" : "primary"} loading={loading} onClick={onConfirm} className="!rounded-xl !py-4 !text-base">
            {confirmLabel}
          </Button>
          <Button variant="ghost" onClick={onCancel} className="!py-4 !text-base">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

export function SectionTitle({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-base font-bold text-[#1A2B4B]">{children}</h3>
      {action}
    </div>
  );
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export const formatINR = (n: number) => `₹${n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
