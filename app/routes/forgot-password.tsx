import { IconId } from "@tabler/icons-react";
import { useState } from "react";
import { Link } from "react-router";

import { Phone } from "@/components/hr/shell";

export default function ForgotPasswordRoute() {
  const [id, setId] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <Phone nav={false}>
      <div className="flex flex-1 items-center p-5">
        <div className="w-full overflow-hidden rounded-[28px] bg-white shadow-xl">
          <div className="bg-[#1A2B4B] px-6 py-8 text-center text-white">
            <div className="mx-auto mb-4 size-16 rounded-2xl border border-white/10 bg-white/10" />
            <h1 className="text-[28px] font-bold">Inaivo HRMS</h1>
            <p className="text-xs uppercase tracking-[2px] text-white/60">Enterprise HRMS</p>
          </div>
          {sent ? (
            <div className="p-8 text-center">
              <div className="mx-auto mb-6 flex size-24 items-center justify-center rounded-full bg-[#10B981]/10">
                <div className="flex size-14 items-center justify-center rounded-full bg-[#10B981] text-2xl text-white shadow-lg">✓</div>
              </div>
              <h2 className="text-xl font-bold">Reset link sent</h2>
              <p className="mt-2 text-sm text-[#6B7280]">If {id} exists, a reset link is on its way.</p>
              <Link to="/" className="mt-6 flex h-12 items-center justify-center rounded-xl border border-[#E5E7EB] font-bold">Back to Login</Link>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (id.trim()) setSent(true);
              }}
              className="space-y-4 p-6"
            >
              <div>
                <h2 className="text-2xl font-bold">Reset Password</h2>
                <p className="text-sm text-[#6B7280]">Enter your Employee ID and Company Code to receive a reset link.</p>
              </div>
              <label className="block space-y-2">
                <span className="text-xs font-bold uppercase text-[#4B5563]">Employee ID</span>
                <div className="flex h-12 items-center gap-2 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] px-3">
                  <IconId size={18} className="text-[#9CA3AF]" />
                  <input value={id} onChange={(e) => setId(e.target.value)} placeholder="Enter ID" className="flex-1 bg-transparent text-sm outline-none" />
                </div>
              </label>
              <button className="h-12 w-full rounded-xl bg-[#2563EB] font-bold text-white shadow-lg">Send Reset Link</button>
              <Link to="/" className="flex h-12 items-center justify-center rounded-xl border border-[#E5E7EB] font-bold text-[#4B5563]">← Back to Login</Link>
            </form>
          )}
        </div>
      </div>
    </Phone>
  );
}
