import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useState } from "react";

import { Card, Header, Phone, labelCls } from "@/components/hr/shell";
import { ATTENDANCE_RECORDS, CALENDAR_DOTS, STATUS_STYLE } from "@/lib/hr-data";

const LEAD = [24, 25, 26, 27, 28, 29];
const DAYS = Array.from({ length: 29 }, (_, i) => i + 1);
const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function AttendanceCalendar() {
  const [sel, setSel] = useState(25);
  const status = CALENDAR_DOTS[sel] ?? "off";
  const rec = ATTENDANCE_RECORDS.find((r) => r.day === sel);
  const st = STATUS_STYLE[rec?.status ?? status];
  return (
    <Phone active="attendance">
      <Header title="Attendance Calendar" />
      <main className="space-y-5 p-4">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-xl font-bold">October 2023</h2>
          <div className="flex gap-4 text-[#6B7280]"><IconChevronLeft size={16} /><IconChevronRight size={16} /></div>
        </div>
        <Card className="space-y-4 rounded-3xl p-4">
          <div className="grid grid-cols-7 text-center text-xs font-bold text-[#9CA3AF]">
            {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d) => <span key={d}>{d}</span>)}
          </div>
          <div className="grid grid-cols-7 gap-y-4 text-center">
            {LEAD.map((d) => <div key={`l${d}`} className="flex h-10 items-center justify-center opacity-25">{d}</div>)}
            {DAYS.map((d) => {
              const k = CALENDAR_DOTS[d];
              const active = d === sel;
              return (
                <button key={d} onClick={() => setSel(d)} className="flex h-10 flex-col items-center justify-center">
                  <span className={`flex size-8 items-center justify-center rounded-full text-base ${active ? "bg-[#2563EB] font-bold text-white" : ""}`}>{d}</span>
                  <span className={`mt-0.5 size-1 rounded-full ${k ? (active ? "bg-white" : STATUS_STYLE[k].dot) : "bg-transparent"}`} />
                </button>
              );
            })}
          </div>
        </Card>
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-[10px] font-bold uppercase text-[#6B7280]">
          {(["present", "absent", "late", "leave", "holiday", "off"] as const).map((k) => (
            <span key={k} className="flex items-center gap-1.5"><span className={`size-2 rounded-full ${STATUS_STYLE[k].dot}`} />{k === "leave" ? "On Leave" : STATUS_STYLE[k].label}</span>
          ))}
        </div>
        <Card className="space-y-4 rounded-3xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold">Oct {sel}, 2023</div>
              <div className="text-xs text-[#6B7280]">{rec ? "General Shift (09:00 AM - 06:00 PM)" : WEEKDAYS[(sel) % 7]}</div>
            </div>
            <span className={`rounded-full px-4 py-2 text-xs font-bold uppercase ${st.bg} ${st.text}`}>{st.label}</span>
          </div>
          {rec?.in && (
            <>
              <div className="flex justify-between border-t border-[#E5E7EB] pt-4">
                <div><div className={labelCls}>In Time</div><div className="font-bold">{rec.in}</div></div>
                <div className="text-right"><div className={labelCls}>Out Time</div><div className="font-bold">{rec.out}</div></div>
              </div>
              <div className="flex justify-between rounded-xl bg-[#F9FAFB] p-4">
                <div><div className={labelCls}>Work Hours</div><div className="font-bold">09h 10m</div></div>
                <div className="text-right"><div className={labelCls}>Overtime</div><div className="font-bold text-[#10B981]">+0h 10m</div></div>
              </div>
            </>
          )}
        </Card>
      </main>
    </Phone>
  );
}
