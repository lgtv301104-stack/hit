import { IconChartLine } from "@tabler/icons-react";

import { Card, Header, Phone } from "@/components/hr/shell";

const rows = [
  ["Working Days", "22", ""], ["Present Days", "18", "text-[#10B981]"], ["Late Arrivals", "02", "text-[#F59E0B]"],
  ["Half Day", "00", ""], ["Paid Leave", "01", "text-[#10B981]"], ["Unpaid Leave", "01", "text-[#EF4444]"], ["Holidays", "01", "text-[#60A5FA]"],
];

export default function AttendanceSummary() {
  return (
    <Phone active="attendance">
      <Header title="Attendance Summary" />
      <main className="space-y-6 p-4">
        <Card className="rounded-3xl p-5">
          <h3 className="mb-4 text-base font-bold">October 2023 Distribution</h3>
          <div className="flex h-[220px] items-center justify-center">
            <div className="relative">
              <svg width="220" height="220" viewBox="0 0 301 220" className="w-full max-w-[301px]">
                <path d="M80.4583 78.013C73.5471 93.1463 71.7233 110.111 75.2597 126.368C78.796 142.624 87.5025 157.298 100.076 168.193C112.649 179.087 128.413 185.617 145.007 186.804C161.601 187.991 178.134 183.771 192.129 174.777C206.125 165.782 216.831 152.497 222.645 136.909C228.459 121.321 229.068 104.269 224.381 88.3066C219.694 72.3438 209.963 58.3283 196.644 48.3583C183.326 38.3883 167.137 33 150.5 33V0C174.267 0 197.394 7.69758 216.421 21.9405C235.447 36.1833 249.348 56.2054 256.044 79.0094C262.74 101.813 261.87 126.173 253.564 148.441C245.259 170.709 229.964 189.689 209.97 202.538C189.977 215.387 166.359 221.415 142.653 219.72C118.946 218.024 96.427 208.696 78.4653 193.132C60.5036 177.569 48.0658 156.606 43.0138 133.382C37.9618 110.159 40.5674 85.9234 50.4404 64.3044L80.4583 78.013Z" fill="#10B981" />
                <path d="M150.5 33C135.739 33 121.289 37.243 108.871 45.2235L91.0294 17.4621C108.769 6.06136 129.412 0 150.5 0V33Z" fill="#F59E0B" />
                <path d="M108.871 45.2233C102.693 49.1931 97.1158 54.0262 92.3073 59.5755L67.3676 37.9651C74.2369 30.0375 82.2049 23.1331 91.0295 17.4619L108.871 45.2233Z" fill="#EF4444" />
                <path d="M92.3072 59.5752C87.4987 65.1246 83.5086 71.3333 80.4583 78.0126L50.4404 64.3039C54.7981 54.762 60.4981 45.8925 67.3675 37.9648L92.3072 59.5752Z" fill="#60A5FA" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold">22</span>
                <span className="text-xs text-[#9CA3AF]">Days</span>
              </div>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 text-xs text-[#6B7280]">
            {[["bg-[#10B981]", "Present (18)"], ["bg-[#EF4444]", "Absent (01)"], ["bg-[#F59E0B]", "Late (02)"], ["bg-[#60A5FA]", "Holiday (01)"]].map(([c, l]) => (
              <span key={l} className="flex items-center gap-2"><span className={`size-2 rounded-full ${c}`} />{l}</span>
            ))}
          </div>
        </Card>
        <Card className="rounded-3xl p-5">
          <h3 className="mb-2 text-base font-bold">Month Breakdown</h3>
          {rows.map(([l, v, c]) => (
            <div key={l} className="flex items-center justify-between border-b border-[#F3F4F6] py-3 text-sm last:border-0">
              <span className="text-[#6B7280]">{l}</span>
              <span className={`font-bold ${c}`}>{v}</span>
            </div>
          ))}
        </Card>
        <div className="flex items-center justify-between rounded-3xl bg-[#1A2B4B] p-5 text-white">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-white/60">Attendance Rate</div>
            <div className="mt-1 flex items-center gap-2"><span className="text-3xl font-bold">92.4%</span><span className="text-xs font-bold text-[#10B981]">↑ 2.1%</span></div>
            <div className="text-[11px] text-white/40">Vs. 90.3% last month</div>
          </div>
          <span className="flex size-12 items-center justify-center rounded-full bg-white/10"><IconChartLine size={20} /></span>
        </div>
      </main>
    </Phone>
  );
}
