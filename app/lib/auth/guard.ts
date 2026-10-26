import { redirect } from "react-router";

import type { Role } from "@/lib/api/models";
import { touchSession } from "@/lib/auth/session";

export function requireRoles(...roles: Role[]) {
  const loader = ({ request }: { request: Request }) => {
    const session = touchSession();
    const url = new URL(request.url);
    if (!session) throw redirect(`/?next=${encodeURIComponent(url.pathname)}`);
    if (!roles.includes(session.role)) throw redirect(`/access-denied?from=${encodeURIComponent(url.pathname)}`);
    return null;
  };
  loader.hydrate = true as const;
  return loader;
}

export const EMPLOYEE_ONLY = requireRoles("EMPLOYEE");
export const MANAGERS = requireRoles("HR_MANAGER", "ADMIN");
export const ADMIN_ONLY = requireRoles("ADMIN");
export const ANY_ROLE = requireRoles("EMPLOYEE", "HR_MANAGER", "ADMIN");
