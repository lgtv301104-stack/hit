import { useSyncExternalStore } from "react";

export type DayStatus = "present" | "absent" | "late" | "holiday" | "leave" | "off";

export interface AttendanceRecord {
  day: number;
  weekday: string;
  status: DayStatus;
  in?: string;
  out?: string;
  note?: string;
}

export const ATTENDANCE_RECORDS: AttendanceRecord[] = [
  { day: 26, weekday: "Thursday", status: "late", in: "09:45 AM", out: "06:30 PM" },
  { day: 25, weekday: "Wednesday", status: "present", in: "09:05 AM", out: "06:15 PM" },
  { day: 24, weekday: "Tuesday", status: "absent" },
  { day: 23, weekday: "Monday", status: "holiday", note: "Holiday: Navami" },
];

export const CALENDAR_DOTS: Record<number, DayStatus> = {
  1: "off", 2: "off", 3: "present", 4: "present", 5: "late", 6: "present", 7: "off", 8: "off",
  9: "off", 10: "present", 11: "absent", 12: "holiday", 13: "present", 14: "off", 15: "off",
  16: "off", 17: "present", 18: "present", 19: "leave", 20: "present", 21: "off", 22: "off",
  23: "off", 24: "present", 25: "present", 29: "off",
};

export const STATUS_STYLE: Record<DayStatus, { label: string; text: string; bg: string; dot: string }> = {
  present: { label: "Present", text: "text-[#10B981]", bg: "bg-[#10B981]/10", dot: "bg-[#10B981]" },
  absent: { label: "Absent", text: "text-[#EF4444]", bg: "bg-[#EF4444]/10", dot: "bg-[#EF4444]" },
  late: { label: "Late", text: "text-[#F59E0B]", bg: "bg-[#F59E0B]/10", dot: "bg-[#F59E0B]" },
  holiday: { label: "Holiday", text: "text-[#60A5FA]", bg: "bg-[#60A5FA]/10", dot: "bg-[#60A5FA]" },
  leave: { label: "On Leave", text: "text-[#2563EB]", bg: "bg-[#2563EB]/10", dot: "bg-[#2563EB]" },
  off: { label: "Off", text: "text-[#6B7280]", bg: "bg-[#E5E7EB]", dot: "bg-[#9CA3AF]" },
};

export type CorrectionStatus = "pending" | "approved" | "rejected" | "cancelled";

export interface Correction {
  id: string;
  date: string;
  requested: string;
  status: CorrectionStatus;
  reason: string;
  requestedIn: string;
  requestedOut: string;
  submittedAt: string;
}

let corrections: Correction[] = [
  { id: "CR-45091", date: "Oct 26, 2023", requested: "Oct 27", status: "pending", reason: "Forgot to check-in on time due to client meeting at reception area. The biometric machine was crowded.", requestedIn: "09:00 AM", requestedOut: "06:30 PM", submittedAt: "Oct 27, 2023 • 10:15 AM" },
  { id: "CR-44872", date: "Oct 15, 2023", requested: "Oct 16", status: "approved", reason: "Biometric device was offline.", requestedIn: "09:00 AM", requestedOut: "06:00 PM", submittedAt: "Oct 16, 2023 • 09:40 AM" },
  { id: "CR-44610", date: "Oct 12, 2023", requested: "Oct 13", status: "rejected", reason: "Missed punch-out.", requestedIn: "09:00 AM", requestedOut: "06:00 PM", submittedAt: "Oct 13, 2023 • 11:05 AM" },
  { id: "CR-44302", date: "Oct 05, 2023", requested: "Oct 06", status: "cancelled", reason: "Raised by mistake.", requestedIn: "09:00 AM", requestedOut: "06:00 PM", submittedAt: "Oct 06, 2023 • 08:55 AM" },
];
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());
const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

export function useCorrections() {
  return useSyncExternalStore(subscribe, () => corrections, () => corrections);
}

export function addCorrection(c: Omit<Correction, "id" | "status" | "requested" | "submittedAt">) {
  const id = `CR-${45000 + Math.floor(Math.random() * 999)}`;
  const created: Correction = { ...c, id, status: "pending", requested: "Oct 27", submittedAt: "Oct 27, 2023 • 10:15 AM" };
  corrections = [created, ...corrections];
  emit();
  return created;
}

export function cancelCorrection(id: string) {
  corrections = corrections.map((c) => (c.id === id ? { ...c, status: "cancelled" } : c));
  emit();
}
