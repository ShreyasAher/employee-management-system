// ==========================================
// Employee Management System — Type Definitions
// ==========================================

// --- Core Enums ---

export type EmployeeStatus = 'active' | 'inactive' | 'on-leave' | 'terminated';
export type Gender = 'male' | 'female' | 'other';
export type LeaveStatus = 'pending' | 'approved' | 'rejected';
export type LeaveType = 'sick' | 'casual' | 'earned' | 'maternity' | 'paternity' | 'unpaid';
export type AttendanceStatus = 'present' | 'absent' | 'half-day' | 'late' | 'holiday' | 'weekend';
export type PaymentStatus = 'success' | 'failed' | 'pending' | 'refunded';
export type RecruitmentStage = 'applied' | 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';
export type Priority = 'low' | 'medium' | 'high' | 'critical';
export type CourseStatus = 'not-started' | 'in-progress' | 'completed';

// --- Employee ---

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
  gender: Gender;
  dateOfBirth: string;
  joiningDate: string;
  designation: string;
  department: string;
  departmentId: string;
  role: string;
  status: EmployeeStatus;
  salary: number;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  skills: string[];
  experience: Experience[];
  documents: Document[];
  manager?: string;
  employeeId: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  size: string;
}

// --- Department ---

export interface Department {
  id: string;
  name: string;
  head: string;
  headAvatar: string;
  description: string;
  employeeCount: number;
  budget: number;
  color: string;
  icon: string;
  performance: number;
  activeProjects: number;
}

// --- Attendance ---

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  clockIn: string;
  clockOut: string;
  status: AttendanceStatus;
  hoursWorked: number;
  overtime: number;
}

export interface AttendanceDay {
  date: string;
  status: AttendanceStatus;
}

export interface AttendanceSummary {
  totalDays: number;
  present: number;
  absent: number;
  halfDay: number;
  late: number;
  holidays: number;
  percentage: number;
}

// --- Leave ---

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeAvatar: string;
  type: LeaveType;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: LeaveStatus;
  appliedOn: string;
  approvedBy?: string;
}

export interface LeaveBalance {
  type: LeaveType;
  label: string;
  total: number;
  used: number;
  remaining: number;
  color: string;
}

export interface Holiday {
  id: string;
  name: string;
  date: string;
  type: 'public' | 'optional' | 'company';
}

// --- Payroll ---

export interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeAvatar: string;
  department: string;
  designation: string;
  month: string;
  year: number;
  basicSalary: number;
  hra: number;
  da: number;
  ta: number;
  bonus: number;
  deductions: number;
  tax: number;
  pf: number;
  netSalary: number;
  grossSalary: number;
  status: 'paid' | 'pending' | 'processing';
  paymentDate?: string;
}

export interface PayslipData {
  employeeName: string;
  employeeId: string;
  designation: string;
  department: string;
  month: string;
  year: number;
  earnings: { label: string; amount: number }[];
  deductions: { label: string; amount: number }[];
  grossEarnings: number;
  totalDeductions: number;
  netPay: number;
}

// --- Payment ---

export interface Payment {
  id: string;
  orderId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  method: string;
  gateway: 'razorpay' | 'stripe';
  date: string;
  description: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  period: 'monthly' | 'yearly';
  features: string[];
  isPopular: boolean;
  color: string;
  employeeLimit: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  amount: number;
  tax: number;
  total: number;
  status: 'paid' | 'unpaid' | 'overdue';
  items: { description: string; quantity: number; rate: number; amount: number }[];
}

// --- Performance ---

export interface KPI {
  id: string;
  name: string;
  target: number;
  achieved: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
}

export interface PerformanceReview {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeAvatar: string;
  reviewPeriod: string;
  rating: number;
  maxRating: number;
  strengths: string[];
  improvements: string[];
  goals: Goal[];
  reviewer: string;
  date: string;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  progress: number;
  dueDate: string;
  priority: Priority;
  status: 'on-track' | 'at-risk' | 'behind' | 'completed';
}

// --- Recruitment ---

export interface JobListing {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  experience: string;
  salary: string;
  description: string;
  requirements: string[];
  postedDate: string;
  closingDate: string;
  applicants: number;
  status: 'open' | 'closed' | 'paused';
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  position: string;
  experience: string;
  skills: string[];
  stage: RecruitmentStage;
  rating: number;
  appliedDate: string;
  resume: string;
}

export interface InterviewSchedule {
  id: string;
  candidateId: string;
  candidateName: string;
  candidateAvatar: string;
  position: string;
  date: string;
  time: string;
  type: 'phone' | 'video' | 'in-person';
  interviewer: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

// --- Training ---

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  enrolled: number;
  maxCapacity: number;
  rating: number;
  thumbnail: string;
  status: CourseStatus;
  progress?: number;
  modules: number;
  completedModules?: number;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId: string;
  status: 'active' | 'expired' | 'pending';
}

export interface Skill {
  name: string;
  level: number;
  maxLevel: number;
  category: string;
}

// --- Dashboard ---

export interface DashboardStats {
  totalEmployees: number;
  activeEmployees: number;
  newJoinees: number;
  onLeave: number;
  attendancePercentage: number;
  payrollTotal: number;
}

export interface Activity {
  id: string;
  type: 'join' | 'leave' | 'promotion' | 'achievement' | 'announcement' | 'birthday';
  title: string;
  description: string;
  timestamp: string;
  avatar?: string;
  icon?: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'meeting' | 'birthday' | 'holiday' | 'training' | 'event';
  description?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  priority: Priority;
  category: string;
}

// --- Notification ---

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
  link?: string;
}

// --- Settings ---

export interface UserSettings {
  general: {
    language: string;
    timezone: string;
    dateFormat: string;
    currency: string;
  };
  appearance: {
    theme: 'light' | 'dark' | 'system';
    sidebarCollapsed: boolean;
    fontSize: 'small' | 'medium' | 'large';
    animations: boolean;
  };
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    leaveRequests: boolean;
    attendance: boolean;
    payroll: boolean;
    announcements: boolean;
  };
  security: {
    twoFactor: boolean;
    sessionTimeout: number;
    loginAlerts: boolean;
  };
}

// --- Chart Data ---

export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: string | number;
}

// --- Report ---

export interface ReportConfig {
  id: string;
  title: string;
  description: string;
  type: 'attendance' | 'payroll' | 'department' | 'employee' | 'performance';
  icon: string;
  color: string;
}
