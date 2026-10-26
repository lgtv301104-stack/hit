import {
  IconBell,
  IconCalendarCheck,
  IconChevronLeft,
  IconCurrencyDollar,
  IconHome,
  IconPlus,
  IconUser,
} from "@tabler/icons-react";
import { Link, useNavigate } from "react-router";

import { STATUS_STYLE, type DayStatus } from "@/lib/hr-data";
import { IS_DEMO } from "@/lib/services";

const AVATAR =
  "https://api.builder.io/api/v1/image/assets/TEMP/0a019b357853b987e973d2839e7022cdf27eb535?width=72";

export function Phone({ children, nav = true, active }: { children: React.ReactNode; nav?: boolean; active?: string }) {
  return (
    <div className="flex min-h-screen justify-center bg-[#F3F4F6] font-[Roboto,sans-serif]">
      <div className="relative flex min-h-screen w-full max-w-[480px] flex-col bg-[#F9FAFB] text-[#1A2B4B] shadow-sm">
        {IS_DEMO && <div className="bg-[#FEF3C7] py-1 text-center text-[10px] font-bold uppercase tracking-wider text-[#92400E]">Demo data · not connected to a backend</div>}
        <div className={`flex flex-1 flex-col ${nav ? "pb-24" : ""}`}>{children}</div>
        {nav && <BottomNav active={active} />}
      </div>
    </div>
  );
}

export function Header({ title, back = true, backTo, bell = false }: { title: string; back?: boolean; backTo?: string; bell?: boolean }) {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-[#E5E7EB] bg-white p-4">
      <div className="flex items-center gap-3">
        {back && (
          <button
            aria-label="Back"
            onClick={() => (backTo ? navigate(backTo) : navigate(-1))}
            className="flex size-10 items-center justify-center rounded-full bg-[#F3F4F6] text-[#1A2B4B]"
          >
            <IconChevronLeft size={18} stroke={2.5} />
          </button>
        )}
        <h1 className="text-lg font-bold">{title}</h1>
      </div>
      {bell && (
        <div className="flex items-center gap-4">
          <Link to="/notifications" aria-label="Notifications" className="relative text-[#6B7280]">
            <IconBell size={20} />
            <span className="absolute -right-1 -top-1 size-2.5 rounded-full border-2 border-white bg-[#EF4444]" />
          </Link>
          <Link to="/profile" aria-label="Profile">
            <img src={AVATAR} alt="" className="size-9 rounded-full border border-[#E5E7EB]" />
          </Link>
        </div>
      )}
    </header>
  );
}

export function StatusPill({ status }: { status: DayStatus }) {
  const s = STATUS_STYLE[status];
  return (
    <span className={`rounded-full px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.5px] ${s.bg} ${s.text}`}>
      {s.label}
    </span>
  );
}

export function Card({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)] ${className}`}>
      {children}
    </div>
  );
}

export function BottomNav({ active }: { active?: string }) {
  const item = (to: string, key: string, label: string, Icon: typeof IconHome) => (
    <Link to={to} className={`flex w-[72px] flex-col items-center gap-1 text-[10px] ${active === key ? "font-bold text-[#2563EB]" : "font-medium text-[#9CA3AF]"}`}>
      <Icon size={18} />
      {label}
    </Link>
  );
  return (
    <nav className="fixed bottom-0 left-1/2 z-20 flex w-full max-w-[480px] -translate-x-1/2 items-center justify-around border-t border-[#E5E7EB] bg-white px-4 pb-4 pt-[18px]">
      {item("/home", "home", "Home", IconHome)}
      {item("/attendance", "attendance", "Attendance", IconCalendarCheck)}
      <div className="w-14" />
      {item("/payslips", "payslips", "Payslips", IconCurrencyDollar)}
      {item("/profile", "profile", "Profile", IconUser)}
      <Link
        to="/requests"
        aria-label="New request"
        className="absolute left-1/2 top-[-12px] flex size-14 -translate-x-1/2 items-center justify-center rounded-full border-4 border-white bg-[#2563EB] text-white shadow-lg"
      >
        <IconPlus size={20} stroke={3} />
      </Link>
    </nav>
  );
}

export function NavyHeader({ title, subtitle, back = false, right, children }: { title: string; subtitle?: string; back?: boolean; right?: React.ReactNode; children?: React.ReactNode }) {
  const navigate = useNavigate();
  return (
    <header className="rounded-b-[32px] bg-[#1A2B4B] px-5 pb-6 pt-8 text-white shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          {back && (
            <button aria-label="Back" onClick={() => navigate(-1)} className="mt-1 text-white">
              <IconChevronLeft size={20} stroke={2.5} />
            </button>
          )}
          <div>
            <h1 className="text-2xl font-bold">{title}</h1>
            {subtitle && <p className="mt-0.5 text-xs text-white/70">{subtitle}</p>}
          </div>
        </div>
        {right}
      </div>
      {children}
    </header>
  );
}

export const labelCls = "text-[11px] font-bold uppercase text-[#9CA3AF]";
