import type { Services } from "@/lib/services/contract";

export class BackendNotConnectedError extends Error {
  constructor(operation: string) {
    super(`The WorkforceOne backend is not connected for "${operation}". Demo data is disabled in live mode.`);
    this.name = "BackendNotConnectedError";
  }
}

const fail = (operation: string) => () => Promise.reject(new BackendNotConnectedError(operation));

export const liveServices: Services = {
  auth: {
    login: fail("auth.login"),
    logout: fail("auth.logout"),
    requestPasswordReset: fail("auth.requestPasswordReset"),
    resetPassword: fail("auth.resetPassword"),
    changePassword: fail("auth.changePassword"),
  },
  profile: { me: fail("profile.me"), updateOwn: fail("profile.updateOwn") },
  employees: {
    list: fail("employees.list"),
    get: fail("employees.get"),
    create: fail("employees.create"),
    update: fail("employees.update"),
    setStatus: fail("employees.setStatus"),
    setAccountRole: fail("employees.setAccountRole"),
  },
  attendance: {
    summary: fail("attendance.summary"),
    dayRecords: fail("attendance.dayRecords"),
    exceptions: fail("attendance.exceptions"),
    myCorrections: fail("attendance.myCorrections"),
    createCorrection: fail("attendance.createCorrection"),
    cancelCorrection: fail("attendance.cancelCorrection"),
  },
  leave: {
    balances: fail("leave.balances"),
    list: fail("leave.list"),
    get: fail("leave.get"),
    create: fail("leave.create"),
    cancel: fail("leave.cancel"),
  },
  requests: {
    list: fail("requests.list"),
    get: fail("requests.get"),
    create: fail("requests.create"),
    cancel: fail("requests.cancel"),
  },
  approvals: {
    inbox: fail("approvals.inbox"),
    get: fail("approvals.get"),
    decide: fail("approvals.decide"),
    history: fail("approvals.history"),
  },
  payroll: {
    periods: fail("payroll.periods"),
    run: fail("payroll.run"),
    transition: fail("payroll.transition"),
    publishPayslips: fail("payroll.publishPayslips"),
    salaryStructures: fail("payroll.salaryStructures"),
    myPayslips: fail("payroll.myPayslips"),
    payslip: fail("payroll.payslip"),
    downloadPayslip: fail("payroll.downloadPayslip"),
  },
  documents: {
    categories: fail("documents.categories"),
    mine: fail("documents.mine"),
    all: fail("documents.all"),
    get: fail("documents.get"),
    upload: fail("documents.upload"),
    review: fail("documents.review"),
    download: fail("documents.download"),
  },
  tasks: {
    mine: fail("tasks.mine"),
    all: fail("tasks.all"),
    get: fail("tasks.get"),
    update: fail("tasks.update"),
    create: fail("tasks.create"),
  },
  notifications: {
    list: fail("notifications.list"),
    markRead: fail("notifications.markRead"),
    markAllRead: fail("notifications.markAllRead"),
  },
  announcements: {
    list: fail("announcements.list"),
    get: fail("announcements.get"),
    publish: fail("announcements.publish"),
  },
  reports: { run: fail("reports.run") },
  admin: {
    branches: fail("admin.branches"),
    saveBranch: fail("admin.saveBranch"),
    departments: fail("admin.departments"),
    saveDepartment: fail("admin.saveDepartment"),
    shifts: fail("admin.shifts"),
    saveShift: fail("admin.saveShift"),
    users: fail("admin.users"),
    permissions: fail("admin.permissions"),
    auditLogs: fail("admin.auditLogs"),
    settings: fail("admin.settings"),
    saveSettings: fail("admin.saveSettings"),
  },
  dashboards: { hr: fail("dashboards.hr") },
};
