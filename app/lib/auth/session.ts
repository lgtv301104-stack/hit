import { useSyncExternalStore } from "react";

import type { Role } from "@/lib/api/models";
import type { LoginInput, Session } from "@/lib/services/contract";
import { services } from "@/lib/services";

const SESSION_KEY = "wfo.session.v1";
const EXPIRED_KEY = "wfo.session.expired";
const REMEMBER_KEY = "wfo.rememberedEmployeeId";
export const IDLE_TIMEOUT_MS = 30 * 60 * 1000;

let cache: Session | null | undefined;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

function load(): Session | null {
  if (typeof window === "undefined") return null;
  if (cache !== undefined) return cache;
  try {
    const raw = window.sessionStorage.getItem(SESSION_KEY);
    const parsed = raw ? (JSON.parse(raw) as Session) : null;
    if (parsed && parsed.expiresAt <= Date.now()) {
      window.sessionStorage.removeItem(SESSION_KEY);
      window.sessionStorage.setItem(EXPIRED_KEY, "1");
      cache = null;
    } else {
      cache = parsed;
    }
  } catch {
    cache = null;
  }
  return cache;
}

export function getSession(): Session | null {
  const s = load();
  if (s && s.expiresAt <= Date.now()) {
    clearSession(true);
    return null;
  }
  return s;
}

export function touchSession(): Session | null {
  const s = getSession();
  if (!s) return null;
  const next = { ...s, expiresAt: Date.now() + IDLE_TIMEOUT_MS };
  cache = next;
  window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(next));
  return next;
}

function saveSession(s: Session) {
  cache = s;
  window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(s));
  window.sessionStorage.removeItem(EXPIRED_KEY);
  emit();
}

export function clearSession(expired = false) {
  cache = null;
  if (typeof window !== "undefined") {
    window.sessionStorage.removeItem(SESSION_KEY);
    if (expired) window.sessionStorage.setItem(EXPIRED_KEY, "1");
  }
  emit();
}

export function consumeExpiredFlag(): boolean {
  if (typeof window === "undefined") return false;
  const v = window.sessionStorage.getItem(EXPIRED_KEY) === "1";
  window.sessionStorage.removeItem(EXPIRED_KEY);
  return v;
}

export function useSession(): Session | null {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    load,
    () => null,
  );
}

export function homeFor(role: Role): string {
  return role === "ADMIN" ? "/admin" : role === "HR_MANAGER" ? "/hr" : "/home";
}

export async function signIn(input: LoginInput, remember: boolean): Promise<Session> {
  const s = await services.auth.login(input);
  saveSession(s);
  if (remember) window.localStorage.setItem(REMEMBER_KEY, input.employeeId);
  else window.localStorage.removeItem(REMEMBER_KEY);
  return s;
}

export async function signOut() {
  try {
    await services.auth.logout();
  } catch {
    // Local sign-out must succeed even when the backend is unreachable.
  }
  clearSession();
}

export function rememberedEmployeeId(): string {
  return typeof window === "undefined" ? "" : (window.localStorage.getItem(REMEMBER_KEY) ?? "");
}
