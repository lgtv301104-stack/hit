import { IconClockHour4 } from "@tabler/icons-react";
import { Link, useSearchParams } from "react-router";

import { Header, Phone } from "@/components/hr/shell";

export default function SoonRoute() {
  const [params] = useSearchParams();
  const title = params.get("title") ?? "Coming soon";
  return (
    <Phone>
      <Header title={title} />
      <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-[#EFF6FF] text-[#2563EB]"><IconClockHour4 size={28} /></span>
        <h2 className="text-lg font-bold">{title} is coming soon</h2>
        <p className="text-sm text-[#6B7280]">This module isn't built yet.</p>
        <Link to="/home" className="mt-2 rounded-xl bg-[#2563EB] px-6 py-3 text-sm font-bold text-white">Back to Home</Link>
      </div>
    </Phone>
  );
}
