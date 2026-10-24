import { IconCheck, IconClock, IconCloudUpload } from "@tabler/icons-react";
import { useRef, useState } from "react";
import { Link, useSearchParams } from "react-router";

import { Card, Header, Phone, labelCls } from "@/components/hr/shell";
import { ATTENDANCE_RECORDS, addCorrection, type Correction } from "@/lib/hr-data";

const to12 = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return `${String(h % 12 || 12).padStart(2, "0")}:${String(m).padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
};

export default function CorrectionNew() {
  const [params] = useSearchParams();
  const day = Number(params.get("day") ?? 26);
  const rec = ATTENDANCE_RECORDS.find((r) => r.day === day) ?? ATTENDANCE_RECORDS[0];
  const [tin, setTin] = useState("09:00");
  const [tout, setTout] = useState("18:30");
  const [reason, setReason] = useState("");
  const [file, setFile] = useState("");
  const [error, setError] = useState("");
  const [created, setCreated] = useState<Correction | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const submit = () => {
    if (reason.trim().length < 10) return setError("Please explain the reason (at least 10 characters).");
    if (tout <= tin) return setError("Requested Out must be after Requested In.");
    setError("");
    setCreated(
      addCorrection({ date: `Oct ${rec.day}, 2023`, reason, requestedIn: to12(tin), requestedOut: to12(tout) }),
    );
  };

  if (created) {
    return (
      <Phone nav={false}>
        <div className="flex flex-1 flex-col items-center justify-center bg-white px-8 py-16 text-center">
          <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-[#EFF6FF]">
            <div className="flex size-14 items-center justify-center rounded-full bg-[#2563EB] text-white"><IconCheck size={24} stroke={3} /></div>
          </div>
          <h2 className="text-2xl font-bold">Request Submitted<br />Successfully</h2>
          <p className="mb-8 mt-2 text-[#6B7280]">Your correction request for October {rec.day}, 2023 has been sent to HR for approval.</p>
          <div className="mb-8 w-full space-y-3 rounded-[20px] border border-[#E5E7EB] bg-[#F9FAFB] p-4 text-[13px]">
            <div className="flex justify-between"><span className="text-[#6B7280]">Request ID</span><b>#{created.id}</b></div>
            <div className="flex justify-between"><span className="text-[#6B7280]">Status</span><b className="uppercase text-[#F59E0B]">Pending</b></div>
          </div>
          <div className="w-full space-y-4">
            <Link to="/attendance/corrections" className="flex h-14 items-center justify-center rounded-2xl bg-[#2563EB] font-bold text-white shadow-md">View History</Link>
            <Link to="/home" className="flex h-14 items-center justify-center rounded-2xl border border-[#E5E7EB] bg-white font-bold">Back to Home</Link>
          </div>
        </div>
      </Phone>
    );
  }

  const field = "flex h-12 items-center rounded-xl border border-[#E5E7EB] bg-white px-3 text-sm";
  return (
    <Phone nav={false}>
      <Header title="Correction Request" />
      <main className="space-y-5 p-5">
        <Card className="space-y-4 rounded-3xl p-5">
          <div>
            <div className={labelCls}>Date of Attendance</div>
            <div className="font-bold">October {rec.day}, 2023 ({rec.weekday})</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className={labelCls}>Current In</div>
              <div className="text-sm font-bold text-[#EF4444]">{rec.in ?? "--:--"}</div>
            </div>
            <div className="text-right">
              <div className={labelCls}>Current Out</div>
              <div className="text-sm font-bold">{rec.out ?? "--:--"}</div>
            </div>
          </div>
        </Card>
        <div className="grid grid-cols-2 gap-4">
          {[["Requested In", tin, setTin], ["Requested Out", tout, setTout]].map(([l, v, set]) => (
            <label key={l as string} className="space-y-2">
              <span className="block text-sm font-bold text-[#4B5563]">{l as string}</span>
              <div className={field}>
                <input type="time" value={v as string} onChange={(e) => (set as (v: string) => void)(e.target.value)} className="min-w-0 flex-1 bg-transparent outline-none" />
                <IconClock size={15} className="shrink-0" />
              </div>
            </label>
          ))}
        </div>
        <label className="block space-y-2">
          <span className="block text-sm font-bold text-[#4B5563]">Reason for Correction</span>
          <textarea value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Explain why a correction is needed..." className="h-[100px] w-full resize-none rounded-xl border border-[#E5E7EB] bg-white p-3 text-sm outline-none" />
        </label>
        <div className="space-y-2">
          <span className="block text-sm font-bold text-[#4B5563]">Attachment (Optional)</span>
          <input ref={fileRef} type="file" accept="image/*,.pdf" className="hidden" onChange={(e) => setFile(e.target.files?.[0]?.name ?? "")} />
          <button type="button" onClick={() => fileRef.current?.click()} className="flex w-full flex-col items-center gap-2 rounded-xl border-2 border-dashed border-[#E5E7EB] bg-white p-5">
            <span className="flex size-10 items-center justify-center rounded-full bg-[#F3F4F6] text-[#9CA3AF]"><IconCloudUpload size={20} /></span>
            <span className="text-xs text-[#6B7280]">{file || "Tap to upload document or image"}</span>
          </button>
        </div>
        {error && <p className="text-sm text-[#EF4444]">{error}</p>}
        <button onClick={submit} className="h-14 w-full rounded-2xl bg-[#2563EB] text-base font-bold text-white shadow-lg">Submit Request</button>
      </main>
    </Phone>
  );
}
