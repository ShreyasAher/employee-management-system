'use client';

import { motion } from 'framer-motion';
import { PageWrapper } from '@/components/layout/page-wrapper';
import { departments } from '@/data/departments';
import { employees } from '@/data/employees';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Users, FolderOpen, IndianRupee, TrendingUp } from 'lucide-react';

export default function DepartmentsPage() {
  const performanceData = departments.map((d) => ({ name: d.name, performance: d.performance, color: d.color }));
  const budgetData = departments.map((d) => ({ name: d.name, value: d.budget / 100000, color: d.color }));

  return (
    <PageWrapper title="Departments" subtitle="Manage organizational departments and teams">
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Departments', value: departments.length, icon: FolderOpen, color: '#6366F1' },
          { label: 'Total Employees', value: departments.reduce((s, d) => s + d.employeeCount, 0), icon: Users, color: '#10B981' },
          { label: 'Total Budget', value: `₹${(departments.reduce((s, d) => s + d.budget, 0) / 10000000).toFixed(1)}Cr`, icon: IndianRupee, color: '#F59E0B' },
          { label: 'Avg Performance', value: `${Math.round(departments.reduce((s, d) => s + d.performance, 0) / departments.length)}%`, icon: TrendingUp, color: '#EC4899' },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="neu-flat p-4 text-center">
            <stat.icon className="w-6 h-6 mx-auto mb-2" style={{ color: stat.color }} />
            <p className="text-xl font-bold">{stat.value}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {departments.map((dept, i) => {
          const deptEmployees = employees.filter((e) => e.departmentId === dept.id);
          return (
            <motion.div
              key={dept.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.05 }}
              className="neu-flat p-5 group hover:scale-[1.02] transition-transform cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${dept.color}15` }}>
                  <Users className="w-5 h-5" style={{ color: dept.color }} />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">{dept.name}</h4>
                  <p className="text-xs text-muted-foreground">{dept.employeeCount} members</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{dept.description}</p>

             
              <div className="flex items-center gap-2 mb-3 p-2 rounded-lg bg-muted/30">
                <Avatar className="w-7 h-7">
                  <AvatarImage src={dept.headAvatar} />
                  <AvatarFallback className="text-[10px]">{dept.head[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs font-medium">{dept.head}</p>
                  <p className="text-[10px] text-muted-foreground">Department Head</p>
                </div>
              </div>

             
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-muted-foreground">Performance</span>
                <span className="font-semibold" style={{ color: dept.color }}>{dept.performance}%</span>
              </div>
              <Progress value={dept.performance} className="h-1.5" />

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/30">
                <Badge variant="secondary" className="text-[10px]">{dept.activeProjects} projects</Badge>
                <span className="text-xs text-muted-foreground">₹{(dept.budget / 100000).toFixed(0)}L budget</span>
              </div>

              
              {deptEmployees.length > 0 && (
                <div className="flex -space-x-2 mt-3">
                  {deptEmployees.slice(0, 4).map((emp) => (
                    <Avatar key={emp.id} className="w-7 h-7 ring-2 ring-background">
                      <AvatarImage src={emp.avatar} />
                      <AvatarFallback className="text-[8px]">{emp.firstName[0]}</AvatarFallback>
                    </Avatar>
                  ))}
                  {deptEmployees.length > 4 && (
                    <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-[10px] font-semibold ring-2 ring-background">
                      +{deptEmployees.length - 4}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="neu-flat p-5">
          <h3 className="text-sm font-semibold mb-4">Department Performance</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis type="number" tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} domain={[0, 100]} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} width={80} />
                <Tooltip contentStyle={{ background: 'var(--neu-surface)', border: 'none', borderRadius: '12px', boxShadow: 'var(--neu-shadow-sm)', fontSize: '12px' }} />
                <Bar dataKey="performance" radius={[0, 6, 6, 0]}>
                  {performanceData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="neu-flat p-5">
          <h3 className="text-sm font-semibold mb-4">Budget Distribution (in Lakhs)</h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={budgetData} cx="50%" cy="50%" outerRadius={90} innerRadius={50} paddingAngle={2} dataKey="value" stroke="none">
                  {budgetData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: 'var(--neu-surface)', border: 'none', borderRadius: '12px', boxShadow: 'var(--neu-shadow-sm)', fontSize: '12px' }} formatter={(value: unknown) => [`₹${(value as number)}L`, '']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {budgetData.map((d) => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                <span className="text-muted-foreground truncate">{d.name}</span>
                <span className="ml-auto font-semibold">₹{d.value}L</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  );
}
