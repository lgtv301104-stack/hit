import { IconLogout } from "@tabler/icons-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router";

import { ConfirmSheet } from "@/components/hr/kit";
import { signOut, useSession } from "@/lib/auth/session";
import { IS_DEMO } from "@/lib/services";

const HR_NAV = [
  { to: "/hr", label: "Dashboard", end: true },
  { to: "/hr/employees", label: "Employees" },
  { to: "/hr/attendance", label: "Attendance" },
  { to: "/hr/approvals", label: "Approvals" },
  { to: "/hr/payroll", label: "Payroll" },
  { to: "/hr/documents", label: "Documents" },
  { to: "/hr/tasks", label: "Tasks" },
  { to: "/hr/communications", label: "Announcements" },
  { to: "/hr/reports", label: "Reports" },
];

const ADMIN_NAV = [
  { to: "/admin", label: "Company", end: true },
  { to: "/admin/organization", label: "Organization" },
  { to: "/admin/users", label: "Users & Roles" },
  { to: "/admin/audit", label: "Audit Logs" },
  { to: "/admin/settings", label: "Settings" },
];

export function Workspace({ title, children, actions }: { title: string; children: React.ReactNode; actions?: React.ReactNode }) {
  const session = useSession();
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState(false);
  const nav = session?.role === "ADMIN" ? [...ADMIN_NAV, ...HR_NAV.filter((n) => n.to !== "/hr").map((n) => n)] : HR_NAV;

  const logout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-[Roboto,sans-serif] text-[#1A2B4B]">
      {IS_DEMO && <div className="bg-[#FEF3C7] py-1 text-center text-[10px] font-bold uppercase tracking-wider text-[#92400E]">Demo data · not connected to a backend</div>}
      <header className="sticky top-0 z-20 border-b border-[#E5E7EB] bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-[#1A2B4B] text-[11px] font-bold text-white">W1</span>
            <div className="leading-tight">
              <div className="text-base font-bold">Inaivo HRMS</div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#2563EB]">{session?.role === "ADMIN" ? "Admin" : "HR Manager"}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm font-medium text-[#6B7280] sm:block">{session?.name}</span>
            <button onClick={() => setConfirm(true)} aria-label="Log out" className="flex items-center gap-1.5 rounded-lg bg-[#FEF2F2] px-3 py-2 text-xs font-bold text-[#EF4444]">
              <IconLogout size={16} /> Log out
            </button>
          </div>
        </div>
        <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4" aria-label="Primary">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) =>
                `shrink-0 border-b-2 px-3 pb-2.5 pt-1 text-sm font-semibold ${isActive ? "border-[#2563EB] text-[#2563EB]" : "border-transparent text-[#6B7280] hover:text-[#1A2B4B]"}`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-6xl space-y-5 p-4 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-bold">{title}</h1>
          {actions}
        </div>
        {children}
      </main>
      <ConfirmSheet
        open={confirm}
        title="Logout"
        message="Are you sure you want to log out? You will need to re-enter your credentials to access WorkforceOne again."
        confirmLabel="Logout"
        icon={<IconLogout size={24} />}
        onConfirm={logout}
        onCancel={() => setConfirm(false)}
      />
    </div>
  );
}
