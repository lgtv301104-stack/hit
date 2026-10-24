import { IconInfoCircle, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

import { Card, Header, Phone, labelCls } from "@/components/hr/shell";
import { cancelCorrection, useCorrections } from "@/lib/hr-data";

export default function CorrectionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const c = useCorrections().find((x) => x.id === id);
  const [confirm, setConfirm] = useState(false);

  if (!c) {
    return (
      <Phone nav={false}>
        <Header title="Request Details" />
        <p className="p-8 text-center text-sm text-[#6B7280]">Request not found.</p>
      </Phone>
    );
  }

  const decided = c.status === "approved" || c.status === "rejected";
  const steps = [
    { t: "Submitted", d: c.submittedAt, dot: "bg-[#10B981] border-[#EFF6FF]" },
    { t: "Pending Review", d: "Assigned to: HR Manager", dot: c.status === "cancelled" ? "bg-[#9CA3AF] border-[#F3F4F6]" : "bg-[#F59E0B] border-[#FEF3C7]" },
    { t: decided ? (c.status === "approved" ? "Approved" : "Rejected") : c.status === "cancelled" ? "Cancelled" : "Final Decision", d: decided || c.status === "cancelled" ? "Completed" : "Awaiting approval", dot: decided ? (c.status === "approved" ? "bg-[#10B981] border-[#EFF6FF]" : "bg-[#EF4444] border-[#FEE2E2]") : "bg-[#E5E7EB] border-[#F9FAFB]" },
  ];

  return (
    <Phone active="attendance">
      <Header title="Request Details" />
      <main className="space-y-6 p-5">
        <Card className="space-y-6 rounded-3xl p-5">
          <h3 className="text-[15px] font-bold">Status Tracking</h3>
          <div>
            {steps.map((s, i) => (
              <div key={s.t} className="flex min-h-[60px] gap-4">
                <div className="flex flex-col items-center">
                  <span className={`size-5 rounded-full border-4 ${s.dot}`} />
                  {i < steps.length - 1 && <span className="w-0.5 flex-1 bg-[#E5E7EB]" />}
                </div>
                <div className="pb-6">
                  <div className="text-sm font-bold">{s.t}</div>
                  <div className="text-xs text-[#6B7280]">{s.d}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="space-y-4 p-5">
          <div className="flex justify-between">
            <div><div className={labelCls}>Requested In</div><div className="font-bold">{c.requestedIn}</div></div>
            <div className="text-right"><div className={labelCls}>Requested Out</div><div className="font-bold text-[#2563EB]">{c.requestedOut}</div></div>
          </div>
          <div className="border-t border-[#E5E7EB] pt-4">
            <div className={labelCls}>Reason</div>
            <p className="mt-1 text-sm leading-[22.75px]">{c.reason}</p>
          </div>
        </Card>
        <div className="space-y-2 rounded-2xl border border-[#2563EB]/10 bg-[#EFF6FF] p-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#2563EB]"><IconInfoCircle size={14} /> Admin Remarks</div>
          <p className="text-[13px] italic text-[#4B5563]">No remarks available yet.</p>
        </div>
        {c.status === "pending" && (
          <button onClick={() => setConfirm(true)} className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl border border-[#EF4444] bg-white font-bold text-[#EF4444]">
            <IconTrash size={16} /> Cancel Request
          </button>
        )}
      </main>
      {confirm && (
        <div className="fixed inset-0 z-30 flex items-end justify-center bg-black/40 p-4">
          <div className="w-full max-w-[448px] space-y-4 rounded-3xl bg-white p-6">
            <h3 className="text-lg font-bold">Cancel this request?</h3>
            <p className="text-sm text-[#6B7280]">Request #{c.id} will be withdrawn and HR will no longer review it.</p>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => setConfirm(false)} className="h-12 rounded-xl border border-[#E5E7EB] font-bold">Keep</button>
              <button onClick={() => { cancelCorrection(c.id); navigate("/attendance/corrections", { replace: true }); }} className="h-12 rounded-xl bg-[#EF4444] font-bold text-white">Cancel Request</button>
            </div>
          </div>
        </div>
      )}
    </Phone>
  );
}
