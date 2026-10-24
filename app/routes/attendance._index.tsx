import { IconCalendarEvent, IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { Link } from "react-router";

import { Card, Header, Phone, StatusPill } from "@/components/hr/shell";
import { ATTENDANCE_RECORDS } from "@/lib/hr-data";

export function RecordRow({ r }: { r: (typeof ATTENDANCE_RECORDS)[number] }) {
  return (
    <Link to={`/attendance/record/${r.day}`} className="block">
      <Card className={`flex items-center justify-between p-4 ${r.status === "absent" ? "opacity-80" : ""}`}>
        <div className="flex items-center gap-3">
          <div className="flex size-12 flex-col items-center justify-center rounded-xl bg-[#F3F4F6]">
            <span className="text-[10px] font-bold uppercase text-[#9CA3AF]">Oct</span>
            <span className="text-lg font-bold leading-6">{r.day}</span>
          </div>
          <div>
            <div className="text-sm font-bold">{r.weekday}</div>
            <div className="text-xs text-[#6B7280]">{r.note ?? (r.in ? `${r.in} - ${r.out}` : "--:-- - --:--")}</div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <StatusPill status={r.status} />
          <IconChevronRight size={12} className="text-[#E5E7EB]" />
        </div>
      </Card>
    </Link>
  );
}

export default function AttendanceOverview() {
  const stats = [
    ["Working Days", "22", "bg-white border-[#E5E7EB] text-[#1A2B4B]", "text-[#9CA3AF]"],
    ["Present", "18", "bg-[#10B981]/5 border-[#10B981]/10 text-[#10B981]", "text-[#10B981]/70"],
    ["Absent", "01", "bg-[#EF4444]/5 border-[#EF4444]/10 text-[#EF4444]", "text-[#EF4444]/70"],
    ["Late", "02", "bg-[#F59E0B]/5 border-[#F59E0B]/10 text-[#F59E0B]", "text-[#F59E0B]/70"],
  ];
  return (
    <Phone active="attendance">
      <Header title="Attendance" backTo="/home" bell />
      <main className="space-y-6 p-4">
        <Card className="flex items-center justify-between p-4">
          <IconChevronLeft size={16} className="text-[#9CA3AF]" />
          <div className="flex items-center gap-2 text-base font-bold">
            <IconCalendarEvent size={16} className="text-[#2563EB]" /> October 2023
          </div>
          <IconChevronRight size={16} className="text-[#9CA3AF]" />
        </Card>
        <div className="grid grid-cols-2 gap-3">
          {stats.map(([l, n, c, lc]) => (
            <Link to="/attendance/summary" key={l} className={`flex flex-col gap-1 rounded-2xl border p-4 shadow-sm ${c}`}>
              <span className={`text-xs font-medium ${lc}`}>{l}</span>
              <span className="text-2xl font-bold">{n}</span>
            </Link>
          ))}
        </div>
        <div className="flex items-center justify-between rounded-2xl bg-[#1A2B4B] p-4 text-white shadow-lg">
          <div className="flex items-center gap-3">
            <span className="flex size-12 items-center justify-center rounded-xl bg-white/10"><IconCalendarEvent size={20} /></span>
            <div>
              <div className="font-bold">Monthly Calendar</div>
              <div className="text-xs text-white/60">View full attendance history</div>
            </div>
          </div>
          <Link to="/attendance/calendar" className="rounded-lg bg-[#2563EB] px-4 py-2.5 text-xs font-bold">View</Link>
        </div>
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-base font-bold">Recent Records</h3>
            <Link to="/attendance/records" className="text-xs font-bold text-[#2563EB]">See All</Link>
          </div>
          {ATTENDANCE_RECORDS.slice(1).map((r) => <RecordRow key={r.day} r={r} />)}
        </section>
      </main>
    </Phone>
  );
}
