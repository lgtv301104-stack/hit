import {
  IconBeach,
  IconCalendarPlus,
  IconFolder,
  IconHistory,
  IconHeartbeat,
  IconReceiptRupee,
  IconSpeakerphone,
  IconShieldCheck,
} from "@tabler/icons-react";
import { Link } from "react-router";

import { Card, Phone } from "@/components/hr/shell";
import { Header } from "@/components/hr/shell";

const quick = [
  { label: "Request Leave", to: "/soon?title=Request Leave", Icon: IconCalendarPlus, color: "text-[#2563EB]" },
  { label: "Attendance", to: "/attendance", Icon: IconHistory, color: "text-[#10B981]" },
  { label: "Payslips", to: "/soon?title=Payslips", Icon: IconReceiptRupee, color: "text-[#F59E0B]" },
  { label: "Documents", to: "/soon?title=Documents", Icon: IconFolder, color: "text-[#1A2B4B]" },
];

export default function HomeRoute() {
  return (
    <Phone active="home">
      <Header title="Inaivo HRMS" back={false} bell />
      <main className="space-y-6 p-4">
        <div>
          <h2 className="text-[22px] font-bold">Hello, Rajesh Kumar</h2>
          <p className="text-sm text-[#6B7280]">EMP-4021 • Software Engineer</p>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {quick.map(({ label, to, Icon, color }) => (
            <Link key={label} to={to} className="flex flex-col items-center gap-2 text-center text-[11px] font-medium text-[#4B5563]">
              <span className="flex size-14 items-center justify-center rounded-2xl border border-[#E5E7EB] bg-white shadow-sm">
                <Icon size={22} className={color} />
              </span>
              {label}
            </Link>
          ))}
        </div>
        <Card className="space-y-4 p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold">Monthly Attendance</h3>
            <span className="text-sm text-[#9CA3AF]">May 2024</span>
          </div>
          <div className="grid grid-cols-4 gap-2 text-center">
            {[
              ["18", "Present", "text-[#10B981] bg-[#10B981]/5 border-[#10B981]/10"],
              ["01", "Absent", "text-[#EF4444] bg-[#EF4444]/5 border-[#EF4444]/10"],
              ["02", "Late", "text-[#F59E0B] bg-[#F59E0B]/5 border-[#F59E0B]/10"],
              ["01", "Leave", "text-[#6B7280] bg-[#F3F4F6] border-[#E5E7EB]"],
            ].map(([n, l, c]) => (
              <Link to="/attendance" key={l} className={`rounded-xl border py-3 ${c}`}>
                <div className="text-xl font-bold">{n}</div>
                <div className="text-[10px] font-bold uppercase">{l}</div>
              </Link>
            ))}
          </div>
        </Card>
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-base font-bold">Leave Balance</h3>
            <Link to="/soon?title=Leave History" className="text-xs font-bold text-[#2563EB]">View History</Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: "Annual", used: "05", total: "12", Icon: IconBeach, tag: "text-[#10B981] bg-[#10B981]/10" },
              { name: "Sick", used: "02", total: "07", Icon: IconHeartbeat, tag: "text-[#EF4444] bg-[#EF4444]/10" },
            ].map(({ name, used, total, Icon, tag }) => (
              <Card key={name} className="space-y-3 p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-[#4B5563]">
                  <Icon size={16} className="text-[#2563EB]" /> {name}
                </div>
                <div className="flex items-end justify-between">
                  <div className="text-2xl font-bold">{used}<span className="text-sm font-normal text-[#9CA3AF]">/{total}</span></div>
                  <span className={`rounded px-2 py-0.5 text-[10px] font-bold ${tag}`}>Used</span>
                </div>
              </Card>
            ))}
          </div>
        </section>
        <section className="space-y-3">
          <h3 className="px-1 text-base font-bold">Latest Payslip</h3>
          <div className="relative overflow-hidden rounded-3xl bg-[#1A2B4B] p-5 text-white shadow-lg">
            <div className="absolute -right-10 -top-6 size-40 rounded-full bg-white/5" />
            <p className="text-xs uppercase tracking-wider text-white/60">October 2023</p>
            <p className="mt-2 text-3xl font-bold">₹24,500.00</p>
            <p className="mt-1 text-xs text-white/60">Net Salary credited to Bank A/c</p>
            <Link to="/soon?title=Payslips" className="absolute right-4 top-4 rounded-lg bg-[#2563EB] px-4 py-2 text-xs font-bold">View</Link>
          </div>
        </section>
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-base font-bold">Company News</h3>
            <Link to="/soon?title=Announcements" className="text-xs font-bold text-[#2563EB]">All News</Link>
          </div>
          {[
            { t: "Holiday Notice: Diwali", d: "The office will remain closed from Nov 12...", p: "2 days ago", Icon: IconSpeakerphone, c: "text-[#F59E0B]" },
            { t: "New Security Protocol", d: "Updated multi-factor authentication...", p: "4 days ago", Icon: IconShieldCheck, c: "text-[#2563EB]" },
          ].map(({ t, d, p, Icon, c }) => (
            <Link key={t} to="/soon?title=Announcements" className="block">
              <Card className="flex items-center gap-3 p-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#F3F4F6]"><Icon size={22} className={c} /></span>
                <div className="min-w-0">
                  <div className="text-sm font-bold">{t}</div>
                  <div className="truncate text-xs text-[#6B7280]">{d}</div>
                  <div className="mt-1 text-[10px] font-medium uppercase text-[#9CA3AF]">Posted {p}</div>
                </div>
              </Card>
            </Link>
          ))}
        </section>
      </main>
    </Phone>
  );
}
