export type Role = "ADMIN" | "HR_MANAGER" | "EMPLOYEE";

export type EmployeeStatus = "active" | "inactive";

export interface Employee {
  id: string;
  name: string;
  designation: string;
  department: string;
  branch: string;
  shift: string;
  status: EmployeeStatus;
  role: Role;
  email: string;
  phone: string;
  joinDate: string;
  employmentType: "Permanent" | "Contract" | "Temporary";
  managerId: string | null;
  grossMonthly: number;
  bankAccount: string;
  address: string;
  emergencyContact: string;
}

export type ProfileEditableField = "phone" | "email" | "address" | "emergencyContact";

export type RequestStatus = "pending" | "approved" | "rejected" | "cancelled";

export type LeaveType = "Annual" | "Sick" | "Casual" | "Unpaid";

export interface LeaveBalance {
  type: LeaveType;
  used: number;
  total: number;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: LeaveType;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  attachmentName: string | null;
  status: RequestStatus;
  submittedAt: string;
  decisionReason: string | null;
}

export type WorkRequestKind = "permission" | "onduty" | "gatepass" | "overtime";

export interface WorkRequest {
  id: string;
  kind: WorkRequestKind;
  employeeId: string;
  employeeName: string;
  date: string;
  status: RequestStatus;
  reason: string;
  details: Record<string, string>;
  submittedAt: string;
  decisionReason: string | null;
}

export interface AttendanceCorrection {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  requested: string;
  status: RequestStatus;
  reason: string;
  requestedIn: string;
  requestedOut: string;
  originalIn: string | null;
  originalOut: string | null;
  submittedAt: string;
  decisionReason: string | null;
}

export type ApprovalKind = "leave" | "permission" | "onduty" | "gatepass" | "overtime" | "correction";

export interface ApprovalItem {
  id: string;
  kind: ApprovalKind;
  employeeId: string;
  employeeName: string;
  title: string;
  date: string;
  status: RequestStatus;
  reason: string;
  submittedAt: string;
  decisionReason: string | null;
}

export interface Payslip {
  id: string;
  employeeId: string;
  period: string;
  month: string;
  earnings: { label: string; amount: number }[];
  deductions: { label: string; amount: number }[];
  net: number;
  paymentStatus: "paid" | "processing" | "unavailable";
  published: boolean;
  paidOn: string | null;
}

export type DocumentCategory = "Identity" | "Employment" | "Education" | "Payroll" | "Compliance" | "Other";

export type DocumentApproval = "pending" | "approved" | "rejected";

export interface EmployeeDocument {
  id: string;
  employeeId: string;
  title: string;
  category: DocumentCategory;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  uploadedAt: string;
  approval: DocumentApproval;
  reviewNote: string | null;
}

export type TaskStatus = "pending" | "in_progress" | "completed";

export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  instructions: string;
  assigneeId: string;
  assignedById: string;
  dueDate: string;
  priority: TaskPriority;
  status: TaskStatus;
  evidenceName: string | null;
  history: { at: string; status: TaskStatus; note: string }[];
}

export type NotificationKind = "leave" | "attendance" | "payslip" | "task" | "announcement" | "general";

export interface AppNotification {
  id: string;
  employeeId: string;
  kind: NotificationKind;
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
  link: string | null;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  publishedAt: string;
  author: string;
  attachmentName: string | null;
  audience: "All" | string;
}

export type PayrollStatus = "open" | "calculated" | "validated" | "approved" | "finalized";

export interface PayrollPeriod {
  id: string;
  label: string;
  startDate: string;
  endDate: string;
  status: PayrollStatus;
  payslipsPublished: boolean;
  anomalies: string[];
  employeeCount: number;
  totalNet: number;
}

export interface SalaryStructure {
  id: string;
  name: string;
  components: { label: string; kind: "earning" | "deduction"; amount: number }[];
}

export interface Branch {
  id: string;
  name: string;
  city: string;
  headcount: number;
}

export interface Department {
  id: string;
  name: string;
  head: string;
  headcount: number;
}

export interface Shift {
  id: string;
  name: string;
  start: string;
  end: string;
  graceMinutes: number;
}

export interface AuditLogEntry {
  id: string;
  at: string;
  actor: string;
  action: string;
  target: string;
  result: "success" | "failed";
}

export interface RolePermissionMatrix {
  role: Role;
  permissions: string[];
}

export interface Paged<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}
