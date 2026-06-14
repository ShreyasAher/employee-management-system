'use client';

import { motion } from 'framer-motion';
import { PageWrapper } from '@/components/layout/page-wrapper';
import { employeeGrowth, departmentDistribution, attendanceTrend, payrollSummary } from '@/data/dashboard';
import { weeklyAttendanceStats } from '@/data/attendance';
import { payrollAnalytics } from '@/data/payroll';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import {
  Download, FileText, CalendarCheck, Wallet, Building2, Users,
  BarChart3, Filter,
} from 'lucide-react';

const reportTypes = [
  { id: 'attendance', title: 'Attendance Report', description: 'Daily, weekly, and monthly attendance analytics', icon: CalendarCheck, color: '#10B981' },
  { id: 'payroll', title: 'Payroll Report', description: 'Salary disbursements, deductions, and tax', icon: Wallet, color: '#6366F1' },
  { id: 'department', title: 'Department Report', description: 'Performance, headcount, and budget by department', icon: Building2, color: '#F59E0B' },
  { id: 'employee', title: 'Employee Report', description: 'Workforce analytics and trends', icon: Users, color: '#EC4899' },
];

const chartTooltipStyle = { background: 'var(--neu-surface)', border: 'none', borderRadius: '12px', boxShadow: 'var(--neu-shadow-sm)', fontSize: '12px' };

export default function ReportsPage() {
  return (
    <PageWrapper title="Reports & Analytics" subtitle="Interactive charts and downloadable reports">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {reportTypes.map((report, i) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="neu-flat p-5 cursor-pointer group hover:scale-[1.02] transition-transform"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `${report.color}15` }}>
              <report.icon className="w-5 h-5" style={{ color: report.color }} />
            </div>
            <h4 className="font-semibold text-sm">{report.title}</h4>
            <p className="text-xs text-muted-foreground mt-1">{report.description}</p>
            <button className="flex items-center gap-1.5 mt-3 text-xs text-primary font-medium group-hover:underline">
              <Download className="w-3.5 h-3.5" /> Download Report
            </button>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="neu-flat p-4 mb-6 flex flex-wrap gap-3 items-center">
        <Filter className="w-4 h-4 text-muted-foreground" />
        <select className="px-3 py-2 text-sm rounded-xl neu-input focus:outline-none">
          <option>Last 30 Days</option>
          <option>Last 90 Days</option>
          <option>Last 6 Months</option>
          <option>Last Year</option>
        </select>
        <select className="px-3 py-2 text-sm rounded-xl neu-input focus:outline-none">
          <option>All Departments</option>
          <option>Engineering</option>
          <option>Design</option>
          <option>Marketing</option>
        </select>
        <button className="ml-auto flex items-center gap-2 px-4 py-2 rounded-xl gradient-primary text-white text-sm font-medium hover:opacity-90 shadow-lg">
          <Download className="w-4 h-4" /> Export All
        </button>
      </motion.div>

      <Tabs defaultValue="workforce" className="space-y-4">
        <TabsList className="neu-flat-sm p-1 bg-transparent h-auto">
          <TabsTrigger value="workforce" className="rounded-lg text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">Workforce</TabsTrigger>
          <TabsTrigger value="attendance" className="rounded-lg text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">Attendance</TabsTrigger>
          <TabsTrigger value="payroll" className="rounded-lg text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">Payroll</TabsTrigger>
          <TabsTrigger value="department" className="rounded-lg text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">Department</TabsTrigger>
        </TabsList>

        <TabsContent value="workforce">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="neu-flat p-5">
              <h3 className="text-sm font-semibold mb-4">Employee Growth Trend</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={employeeGrowth}>
                    <defs><linearGradient id="rg1" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} /><stop offset="95%" stopColor="#6366F1" stopOpacity={0} /></linearGradient></defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={chartTooltipStyle} />
                    <Area type="monotone" dataKey="value" stroke="#6366F1" strokeWidth={2} fill="url(#rg1)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="neu-flat p-5">
              <h3 className="text-sm font-semibold mb-4">Hiring vs Attrition</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={employeeGrowth}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={chartTooltipStyle} />
                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                    <Bar dataKey="hired" fill="#10B981" name="Hired" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="left" fill="#EF4444" name="Left" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="attendance">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="neu-flat p-5">
              <h3 className="text-sm font-semibold mb-4">Weekly Attendance</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyAttendanceStats}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={chartTooltipStyle} />
                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                    <Bar dataKey="present" stackId="a" fill="#10B981" name="Present" />
                    <Bar dataKey="late" stackId="a" fill="#F59E0B" name="Late" />
                    <Bar dataKey="absent" stackId="a" fill="#EF4444" name="Absent" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="neu-flat p-5">
              <h3 className="text-sm font-semibold mb-4">Attendance Trend</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={attendanceTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
                    <YAxis domain={[80, 100]} tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={chartTooltipStyle} />
                    <Line type="monotone" dataKey="value" stroke="#6366F1" strokeWidth={2.5} dot={{ fill: '#6366F1', r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="payroll">
          <div className="neu-flat p-5">
            <h3 className="text-sm font-semibold mb-4">Payroll Analytics — 6 Month Trend</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={payrollAnalytics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`} />
                  <Tooltip contentStyle={chartTooltipStyle} formatter={(value) => [`₹${(Number(value) / 100000).toFixed(1)}L`,""]}
/>
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="salary" fill="#6366F1" name="Salary" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="bonus" fill="#10B981" name="Bonus" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="deductions" fill="#EF4444" name="Deductions" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="department">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="neu-flat p-5">
              <h3 className="text-sm font-semibold mb-4">Department Size Distribution</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={departmentDistribution} cx="50%" cy="50%" outerRadius={100} innerRadius={60} paddingAngle={2} dataKey="value" stroke="none">
                      {departmentDistribution.map((entry, i) => <Cell key={i} fill={entry.color as string} />)}
                    </Pie>
                    <Tooltip contentStyle={chartTooltipStyle} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="neu-flat p-5">
              <h3 className="text-sm font-semibold mb-4">Department Headcount</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={departmentDistribution} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis type="number" tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} width={80} />
                    <Tooltip contentStyle={chartTooltipStyle} />
                    <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                      {departmentDistribution.map((entry, i) => <Cell key={i} fill={entry.color as string} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </PageWrapper>
  );
}
