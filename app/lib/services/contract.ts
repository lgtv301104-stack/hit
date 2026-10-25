import type {
  Announcement,
  ApprovalItem,
  ApprovalKind,
  AppNotification,
  AttendanceCorrection,
  AuditLogEntry,
  Branch,
  Department,
  Employee,
  EmployeeDocument,
  DocumentApproval,
  DocumentCategory,
  EmployeeStatus,
  LeaveBalance,
  LeaveRequest,
  LeaveType,
  Paged,
  PayrollPeriod,
  Payslip,
  ProfileEditableField,
  RequestStatus,
  Role,
  RolePermissionMatrix,
  SalaryStructure,
  Shift,
  Task,
  TaskPriority,
  TaskStatus,
  WorkRequest,
  WorkRequestKind,
} from "@/lib/api/models";

export interface Session {
  token: string;
  employeeId: string;
  name: string;
  role: Role;
  companyCode: string;
  expiresAt: number;
}

export interface LoginInput {
  companyCode: string;
  employeeId: string;
  password: string;
}

export interface EmployeeQuery {
  q?: string;
  status?: EmployeeStatus | "all";
  department?: string;
  branch?: string;
  page?: number;
  pageSize?: number;
}

export type EmployeeInput = Omit<Employee, "id" | "status"> & { id?: string; status?: EmployeeStatus };

export interface LeaveInput {
  type: LeaveType;
  startDate: string;
  endDate: string;
  reason: string;
  attachmentName: string | null;
}

export interface WorkRequestInput {
  kind: WorkRequestKind;
  date: string;
  reason: string;
  details: Record<string, string>;
}

export interface CorrectionInput {
  date: string;
  requestedIn: string;
  requestedOut: string;
  reason: string;
}

export interface UploadInput {
  title: string;
  category: DocumentCategory;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
}

export interface TaskUpdateInput {
  status: TaskStatus;
  note: string;
  evidenceName: string | null;
}

export interface TaskCreateInput {
  title: string;
  instructions: string;
  assigneeId: string;
  dueDate: string;
  priority: TaskPriority;
}

export interface AnnouncementInput {
  title: string;
  body: string;
  audience: string;
  attachmentName: string | null;
}

export interface ReportQuery {
  report: "employees" | "attendance" | "leave" | "payroll" | "tasks";
  department: string;
  from: string;
  to: string;
}

export interface ReportResult {
  columns: string[];
  rows: (string | number)[][];
  summary: { label: string; value: string }[];
}

export interface UserAccount {
  employeeId: string;
  name: string;
  role: Role;
  active: boolean;
  lastLogin: string;
}

export interface SystemSettings {
  companyName: string;
  companyCode: string;
  timezone: string;
  weekStart: "Monday" | "Sunday";
  sessionTimeoutMinutes: number;
  allowEmployeeProfileEdit: boolean;
  attendanceGraceMinutes: number;
}

export interface AttendanceDay {
  date: string;
  employeeId: string;
  employeeName: string;
  status: "present" | "absent" | "late" | "leave" | "holiday" | "off";
  in: string | null;
  out: string | null;
  flags: ("late" | "missing_punch" | "overtime" | "absent")[];
}

export interface AttendanceSummary {
  present: number;
  absent: number;
  late: number;
  leave: number;
  total: number;
}

export interface PayrollRunDetail {
  period: PayrollPeriod;
  lines: {
    employeeId: string;
    employeeName: string;
    gross: number;
    deductions: number;
    net: number;
    attendanceDays: number;
    warnings: string[];
  }[];
}

export interface HrDashboard {
  totalEmployees: number;
  activeEmployees: number;
  inactiveEmployees: number;
  presentToday: number;
  lateToday: number;
  absentToday: number;
  pendingLeave: number;
  pendingApprovals: number;
  payrollStatus: PayrollStatus;
  upcomingDeadlines: { title: string; due: string }[];
  recentActivity: { at: string; text: string }[];
}

export type PayrollStatus = PayrollPeriod["status"];

export interface Services {
  auth: {
    login(input: LoginInput): Promise<Session>;
    logout(): Promise<void>;
    requestPasswordReset(employeeId: string): Promise<{ maskedEmail: string }>;
    resetPassword(input: { employeeId: string; code: string; password: string }): Promise<void>;
    changePassword(input: { current: string; next: string }): Promise<void>;
  };
  profile: {
    me(): Promise<Employee>;
    updateOwn(patch: Partial<Record<ProfileEditableField, string>>): Promise<Employee>;
  };
  employees: {
    list(query: EmployeeQuery): Promise<Paged<Employee>>;
    get(id: string): Promise<Employee>;
    create(input: EmployeeInput): Promise<Employee>;
    update(id: string, patch: Partial<EmployeeInput>): Promise<Employee>;
    setStatus(id: string, status: EmployeeStatus): Promise<Employee>;
    setAccountRole(id: string, role: Role): Promise<Employee>;
  };
  attendance: {
    summary(employeeId: string, month: string): Promise<AttendanceSummary>;
    dayRecords(date: string, employeeId?: string): Promise<AttendanceDay[]>;
    exceptions(date: string): Promise<AttendanceDay[]>;
    myCorrections(): Promise<AttendanceCorrection[]>;
    createCorrection(input: CorrectionInput): Promise<AttendanceCorrection>;
    cancelCorrection(id: string): Promise<void>;
  };
  leave: {
    balances(employeeId: string): Promise<LeaveBalance[]>;
    list(employeeId: string): Promise<LeaveRequest[]>;
    get(id: string): Promise<LeaveRequest>;
    create(employeeId: string, input: LeaveInput): Promise<LeaveRequest>;
    cancel(id: string): Promise<void>;
  };
  requests: {
    list(employeeId: string, kind?: WorkRequestKind): Promise<WorkRequest[]>;
    get(id: string): Promise<WorkRequest>;
    create(employeeId: string, input: WorkRequestInput): Promise<WorkRequest>;
    cancel(id: string): Promise<void>;
  };
  approvals: {
    inbox(kind?: ApprovalKind | "all", status?: RequestStatus | "all"): Promise<ApprovalItem[]>;
    get(id: string): Promise<ApprovalItem>;
    decide(input: { id: string; decision: "approved" | "rejected"; reason: string }): Promise<ApprovalItem>;
    history(): Promise<ApprovalItem[]>;
  };
  payroll: {
    periods(): Promise<PayrollPeriod[]>;
    run(periodId: string): Promise<PayrollRunDetail>;
    transition(periodId: string, to: PayrollStatus): Promise<PayrollPeriod>;
    publishPayslips(periodId: string): Promise<PayrollPeriod>;
    salaryStructures(): Promise<SalaryStructure[]>;
    myPayslips(employeeId: string): Promise<Payslip[]>;
    payslip(id: string): Promise<Payslip>;
    downloadPayslip(id: string): Promise<Blob>;
  };
  documents: {
    categories(): Promise<DocumentCategory[]>;
    mine(employeeId: string): Promise<EmployeeDocument[]>;
    all(): Promise<EmployeeDocument[]>;
    get(id: string): Promise<EmployeeDocument>;
    upload(employeeId: string, input: UploadInput, onProgress: (percent: number) => void): Promise<EmployeeDocument>;
    review(id: string, decision: DocumentApproval, note: string): Promise<EmployeeDocument>;
    download(id: string): Promise<Blob>;
  };
  tasks: {
    mine(employeeId: string): Promise<Task[]>;
    all(): Promise<Task[]>;
    get(id: string): Promise<Task>;
    update(id: string, input: TaskUpdateInput): Promise<Task>;
    create(input: TaskCreateInput): Promise<Task>;
  };
  notifications: {
    list(employeeId: string): Promise<AppNotification[]>;
    markRead(id: string): Promise<void>;
    markAllRead(employeeId: string): Promise<void>;
  };
  announcements: {
    list(): Promise<Announcement[]>;
    get(id: string): Promise<Announcement>;
    publish(input: AnnouncementInput): Promise<Announcement>;
  };
  reports: {
    run(query: ReportQuery): Promise<ReportResult>;
  };
  admin: {
    branches(): Promise<Branch[]>;
    saveBranch(input: Omit<Branch, "headcount"> & { id?: string }): Promise<Branch>;
    departments(): Promise<Department[]>;
    saveDepartment(input: Omit<Department, "headcount"> & { id?: string }): Promise<Department>;
    shifts(): Promise<Shift[]>;
    saveShift(input: Omit<Shift, "id"> & { id?: string }): Promise<Shift>;
    users(): Promise<UserAccount[]>;
    permissions(): Promise<RolePermissionMatrix[]>;
    auditLogs(limit: number): Promise<AuditLogEntry[]>;
    settings(): Promise<SystemSettings>;
    saveSettings(input: SystemSettings): Promise<SystemSettings>;
  };
  dashboards: {
    hr(): Promise<HrDashboard>;
  };
}
