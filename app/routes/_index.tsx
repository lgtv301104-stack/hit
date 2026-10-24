import { IconId, IconLock } from "@tabler/icons-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { Phone } from "@/components/hr/shell";
import { APP_TITLE } from "@/lib/app-config";

export function meta() {
  return [{ title: `Sign in · ${APP_TITLE}` }];
}

export default function LoginRoute() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id.trim() || !pw) return setError("Enter your Employee ID and password.");
    setError("");
    setDone(true);
    setTimeout(() => navigate("/home"), 1200);
  };

  if (done) {
    return (
      <Phone nav={false}>
        <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
          <div className="mb-6 flex size-24 items-center justify-center rounded-full bg-[#10B981]/10">
            <div className="flex size-14 items-center justify-center rounded-full bg-[#10B981] text-2xl text-white shadow-lg">✓</div>
          </div>
          <h1 className="text-xl font-bold">Authentication successful</h1>
          <p className="mt-2 text-sm text-[#6B7280]">Continuing to your authorized workspace...</p>
        </div>
      </Phone>
    );
  }

  return (
    <Phone nav={false}>
      <div className="flex flex-1 items-center p-5">
        <div className="w-full overflow-hidden rounded-[28px] bg-white shadow-xl">
          <div className="bg-[#1A2B4B] px-6 py-8 text-center text-white">
            <div className="mx-auto mb-4 size-16 rounded-2xl border border-white/10 bg-white/10" />
            <h1 className="text-[28px] font-bold">Inaivo HRMS</h1>
            <p className="text-xs uppercase tracking-[2px] text-white/60">Enterprise HRMS</p>
          </div>
          <form onSubmit={submit} className="space-y-4 p-6">
            <div>
              <h2 className="text-2xl font-bold">Sign In</h2>
              <p className="text-sm text-[#6B7280]">Use your Employee ID and password.</p>
            </div>
            <label className="block space-y-2">
              <span className="text-xs font-bold uppercase text-[#4B5563]">Employee ID</span>
              <div className="flex h-12 items-center gap-2 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] px-3">
                <IconId size={18} className="text-[#9CA3AF]" />
                <input value={id} onChange={(e) => setId(e.target.value)} placeholder="Enter ID" className="flex-1 bg-transparent text-sm outline-none" />
              </div>
            </label>
            <label className="block space-y-2">
              <span className="text-xs font-bold uppercase text-[#4B5563]">Password</span>
              <div className="flex h-12 items-center gap-2 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] px-3">
                <IconLock size={18} className="text-[#9CA3AF]" />
                <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="Enter password" className="flex-1 bg-transparent text-sm outline-none" />
              </div>
            </label>
            {error && <p className="text-sm text-[#EF4444]">{error}</p>}
            <button className="h-12 w-full rounded-xl bg-[#2563EB] font-bold text-white shadow-lg">Sign In</button>
            <Link to="/forgot-password" className="block text-center text-sm font-bold text-[#2563EB]">Forgot password?</Link>
          </form>
        </div>
      </div>
    </Phone>
  );
}
