import { IconCalendarPlus, IconChevronRight, IconHistory, IconShield, IconX } from "@tabler/icons-react";
import { Link } from "react-router";

import { Card, Header, Phone } from "@/components/hr/shell";
import { useCorrections, type CorrectionStatus } from "@/lib/hr-data";

export const CORR_STYLE: Record<CorrectionStatus, { text: string; bg: string; iconBg: string; Icon: typeof IconX; icon: string }> = {
  pending: { text: "text-[#F59E0B]", bg: "bg-[#F59E0B]/10", iconBg: "bg-[#EFF6FF]", Icon: IconCalendarPlus, icon: "text-[#2563EB]" },
  approved: { text: "text-[#10B981]", bg: "bg-[#10B981]/10", iconBg: "bg-[#10B981]/5", Icon: IconHistory, icon: "text-[#10B981]" },
  rejected: { text: "text-[#EF4444]", bg: "bg-[#EF4444]/10", iconBg: "bg-[#EF4444]/5", Icon: IconShield, icon: "text-[#EF4444]" },
  cancelled: { text: "text-[#6B7280]", bg: "bg-[#E5E7EB]", iconBg: "bg-[#F3F4F6]", Icon: IconX, icon: "text-[#6B7280]" },
};

export default function CorrectionHistory() {
  const items = useCorrections();
  return (
    <Phone active="attendance">
      <Header title="Correction History" />
      <main className="space-y-3 p-4">
        {items.map((c) => {
          const s = CORR_STYLE[c.status];
          return (
            <Link key={c.id} to={`/attendance/correction/${c.id}`} className="block">
              <Card className={`flex items-center justify-between p-4 ${c.status === "cancelled" ? "opacity-70" : ""}`}>
                <div className="flex items-center gap-3">
                  <span className={`flex size-12 items-center justify-center rounded-xl ${s.iconBg}`}><s.Icon size={20} className={s.icon} /></span>
                  <div>
                    <div className="text-sm font-bold">{c.date}</div>
                    <div className="text-[11px] font-medium uppercase text-[#9CA3AF]">Requested: {c.requested}</div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`rounded-full px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.5px] ${s.bg} ${s.text}`}>{c.status}</span>
                  <IconChevronRight size={12} className="text-[#E5E7EB]" />
                </div>
              </Card>
            </Link>
          );
        })}
      </main>
    </Phone>
  );
}
