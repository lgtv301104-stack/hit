import { IconAdjustmentsHorizontal, IconSearch } from "@tabler/icons-react";
import { useState } from "react";

import { Header, Phone } from "@/components/hr/shell";
import { ATTENDANCE_RECORDS, STATUS_STYLE } from "@/lib/hr-data";

import { RecordRow } from "./attendance._index";

export default function AttendanceRecords() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const rows = ATTENDANCE_RECORDS.filter(
    (r) =>
      (!filter || r.status === filter) &&
      (!q || `oct ${r.day} ${r.weekday} ${r.status}`.toLowerCase().includes(q.toLowerCase())),
  );
  return (
    <Phone active="attendance">
      <Header title="Attendance Records" bell />
      <main className="space-y-4 p-4">
        <div className="flex gap-3">
          <div className="flex h-12 flex-1 items-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-3">
            <IconSearch size={16} className="text-[#9CA3AF]" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by date..." className="flex-1 bg-transparent text-sm outline-none" />
          </div>
          <button onClick={() => setOpen((o) => !o)} aria-label="Filters" className="flex size-12 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white">
            <IconAdjustmentsHorizontal size={16} />
          </button>
        </div>
        {open && (
          <div className="flex flex-wrap gap-2">
            {[null, "present", "late", "absent", "holiday"].map((s) => (
              <button key={s ?? "all"} onClick={() => setFilter(s)} className={`rounded-full border px-3 py-1.5 text-xs font-bold ${filter === s ? "border-[#2563EB] bg-[#2563EB] text-white" : "border-[#E5E7EB] bg-white"}`}>
                {s ? STATUS_STYLE[s as keyof typeof STATUS_STYLE].label : "All"}
              </button>
            ))}
          </div>
        )}
        <div className="space-y-3">
          {rows.map((r) => <RecordRow key={r.day} r={r} />)}
          {!rows.length && <p className="py-8 text-center text-sm text-[#9CA3AF]">No records found.</p>}
        </div>
      </main>
    </Phone>
  );
}
