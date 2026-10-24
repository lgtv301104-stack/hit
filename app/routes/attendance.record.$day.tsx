import { IconEdit, IconFingerprint } from "@tabler/icons-react";
import { Link, useParams } from "react-router";

import { Card, Header, Phone, labelCls } from "@/components/hr/shell";
import { ATTENDANCE_RECORDS, STATUS_STYLE } from "@/lib/hr-data";

export default function RecordDetails() {
  const { day } = useParams();
  const r = ATTENDANCE_RECORDS.find((x) => String(x.day) === day) ?? ATTENDANCE_RECORDS[0];
  const s = STATUS_STYLE[r.status];
  return (
    <Phone nav={false}>
      <Header title="Record Details" />
      <main className="space-y-6 p-5">
        <div className="flex flex-col items-center gap-3 text-center">
          <div>
            <h2 className="text-[22px] font-bold">October {r.day}, 2023</h2>
            <p className="font-medium text-[#6B7280]">{r.weekday}</p>
          </div>
          <span className={`rounded-full px-5 py-2.5 text-sm font-bold uppercase tracking-[1.4px] ${s.bg} ${s.text}`}>
            {r.status === "late" ? "Late Arrival" : s.label}
          </span>
        </div>
        <Card className="space-y-5 rounded-3xl p-5">
          <div className="grid grid-cols-2 gap-y-5">
            <Cell label="Shift Name" value="General Shift" />
            <Cell label="Assigned Time" value="09:00 - 18:00" right />
            <Cell label="Actual In" value={r.in ?? "--:--"} color={r.status === "late" ? "text-[#EF4444]" : ""} />
            <Cell label="Actual Out" value={r.out ?? "--:--"} right />
          </div>
          <div className="grid grid-cols-2 border-t border-[#E5E7EB] pt-5">
            <Cell label="Total Hours" value={r.in ? "08h 45m" : "00h 00m"} />
            <Cell label="Overtime" value={r.in ? "+0h 30m" : "0h 00m"} right color="text-[#10B981]" />
          </div>
        </Card>
        <Card className="flex items-center gap-3 p-4">
          <span className="flex size-10 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#2563EB]"><IconFingerprint size={20} /></span>
          <div>
            <div className="text-sm font-bold">Biometric - Main Gate</div>
            <div className="text-xs text-[#6B7280]">Device ID: BMD-0421-HO</div>
          </div>
        </Card>
        <Link to={`/attendance/correction/new?day=${r.day}`} className="flex h-14 items-center justify-center gap-2 rounded-2xl border border-[#2563EB] bg-white font-bold text-[#2563EB]">
          <IconEdit size={16} /> Request Correction
        </Link>
      </main>
    </Phone>
  );
}

function Cell({ label, value, right, color = "" }: { label: string; value: string; right?: boolean; color?: string }) {
  return (
    <div className={`flex flex-col gap-1 ${right ? "items-end text-right" : ""}`}>
      <span className={labelCls}>{label}</span>
      <span className={`text-[15px] font-bold ${color}`}>{value}</span>
    </div>
  );
}
