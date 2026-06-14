'use client';

import { motion } from 'framer-motion';
import { PageWrapper } from '@/components/layout/page-wrapper';
import { performanceData } from '@/data/training';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Award, Target, TrendingUp, CheckCircle2, AlertTriangle, Clock, Flag } from 'lucide-react';
import { cn } from '@/lib/utils';

const statusColors: Record<string, { bg: string; text: string }> = {
  'on-track': { bg: 'bg-emerald-100 dark:bg-emerald-500/10', text: 'text-emerald-700 dark:text-emerald-400' },
  'at-risk': { bg: 'bg-amber-100 dark:bg-amber-500/10', text: 'text-amber-700 dark:text-amber-400' },
  'behind': { bg: 'bg-red-100 dark:bg-red-500/10', text: 'text-red-700 dark:text-red-400' },
  'completed': { bg: 'bg-blue-100 dark:bg-blue-500/10', text: 'text-blue-700 dark:text-blue-400' },
};

const statusIcons: Record<string, typeof CheckCircle2> = {
  'on-track': CheckCircle2,
  'at-risk': AlertTriangle,
  'behind': Clock,
  'completed': Flag,
};

const priorityColors: Record<string, string> = {
  high: 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400',
  medium: 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
  low: 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
};

export default function PerformancePage() {
  const { kpis, goals, monthlyRatings } = performanceData;
  const radarData = kpis.map((k) => ({ subject: k.name.split(' ')[0], A: k.achieved, fullMark: k.target }));

  return (
    <PageWrapper title="Performance" subtitle="Track KPIs, goals, and employee performance">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="neu-flat p-5"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{kpi.name}</p>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-bold">{kpi.achieved}</span>
                  <span className="text-sm text-muted-foreground">/ {kpi.target} {kpi.unit}</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className={cn('w-4 h-4', kpi.trend === 'up' ? 'text-emerald-500' : kpi.trend === 'down' ? 'text-red-500 rotate-180' : 'text-amber-500')} />
                <span className="text-xs capitalize text-muted-foreground">{kpi.trend}</span>
              </div>
            </div>
            <Progress value={(kpi.achieved / kpi.target) * 100} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">{Math.round((kpi.achieved / kpi.target) * 100)}% of target</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="neu-flat p-5">
          <h3 className="text-sm font-semibold mb-4">Performance Radar</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="var(--border)" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} />
                <Radar name="Achieved" dataKey="A" stroke="#6366F1" fill="#6366F1" fillOpacity={0.3} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="neu-flat p-5">
          <h3 className="text-sm font-semibold mb-4">Monthly Rating Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyRatings} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 5]} tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: 'var(--neu-surface)', border: 'none', borderRadius: '12px', boxShadow: 'var(--neu-shadow-sm)', fontSize: '12px' }} />
                <Line type="monotone" dataKey="avg" stroke="#6366F1" strokeWidth={2.5} dot={{ fill: '#6366F1', r: 4 }} />
                <Line type="monotone" dataKey="max" stroke="#10B981" strokeWidth={1.5} strokeDasharray="5 5" dot={false} />
                <Line type="monotone" dataKey="min" stroke="#EF4444" strokeWidth={1.5} strokeDasharray="5 5" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="neu-flat p-5">
        <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
          <Target className="w-4 h-4 text-primary" /> Goal Tracking
        </h3>
        <div className="space-y-4">
          {goals.map((goal) => {
            const StatusIcon = statusIcons[goal.status];
            const statusStyle = statusColors[goal.status];
            return (
              <div key={goal.id} className="p-4 rounded-xl border border-border/30 hover:border-primary/20 transition-colors">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold">{goal.title}</h4>
                      <Badge className={cn('text-[10px] border-0 capitalize', priorityColors[goal.priority])}>{goal.priority}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{goal.description}</p>
                  </div>
                  <Badge className={cn('text-[10px] border-0 capitalize flex items-center gap-1', statusStyle?.bg, statusStyle?.text)}>
                    <StatusIcon className="w-3 h-3" /> {goal.status.replace('-', ' ')}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <Progress value={goal.progress} className="h-2 flex-1" />
                  <span className="text-xs font-semibold w-10 text-right">{goal.progress}%</span>
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">Due: {new Date(goal.dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
              </div>
            );
          })}
        </div>
      </motion.div>
    </PageWrapper>
  );
}
