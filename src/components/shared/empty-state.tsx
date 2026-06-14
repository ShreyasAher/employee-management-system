'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  Users, FileText, Calendar, BarChart2, Inbox,
  Search, Wifi, AlertCircle, Plus,
} from 'lucide-react';

type EmptyStateVariant =
  | 'employees'
  | 'leave'
  | 'attendance'
  | 'payroll'
  | 'reports'
  | 'notifications'
  | 'search'
  | 'offline'
  | 'error'
  | 'generic';

interface EmptyStateProps {
  variant?: EmptyStateVariant;
  title?: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

const variantConfig: Record<
  EmptyStateVariant,
  {
    icon: typeof Users;
    color: string;
    bg: string;
    defaultTitle: string;
    defaultDescription: string;
  }
> = {
  employees: {
    icon: Users,
    color: 'text-indigo-500',
    bg: 'bg-indigo-100 dark:bg-indigo-500/10',
    defaultTitle: 'No employees found',
    defaultDescription: 'Try adjusting your search filters or add a new employee to get started.',
  },
  leave: {
    icon: Calendar,
    color: 'text-emerald-500',
    bg: 'bg-emerald-100 dark:bg-emerald-500/10',
    defaultTitle: 'No leave requests',
    defaultDescription: 'There are no leave requests matching your criteria.',
  },
  attendance: {
    icon: Calendar,
    color: 'text-blue-500',
    bg: 'bg-blue-100 dark:bg-blue-500/10',
    defaultTitle: 'No attendance records',
    defaultDescription: 'Attendance records will appear here once employees start clocking in.',
  },
  payroll: {
    icon: FileText,
    color: 'text-violet-500',
    bg: 'bg-violet-100 dark:bg-violet-500/10',
    defaultTitle: 'No payroll records',
    defaultDescription: 'Payroll records will appear after the first payroll cycle is processed.',
  },
  reports: {
    icon: BarChart2,
    color: 'text-amber-500',
    bg: 'bg-amber-100 dark:bg-amber-500/10',
    defaultTitle: 'No data available',
    defaultDescription: 'There is not enough data to generate reports yet. Check back later.',
  },
  notifications: {
    icon: Inbox,
    color: 'text-primary',
    bg: 'bg-primary/10',
    defaultTitle: "You're all caught up!",
    defaultDescription: 'No new notifications. We\'ll notify you when something needs your attention.',
  },
  search: {
    icon: Search,
    color: 'text-muted-foreground',
    bg: 'bg-muted/50',
    defaultTitle: 'No results found',
    defaultDescription: 'Try different keywords or clear your search to browse all items.',
  },
  offline: {
    icon: Wifi,
    color: 'text-slate-500',
    bg: 'bg-slate-100 dark:bg-slate-500/10',
    defaultTitle: 'You\'re offline',
    defaultDescription: 'Check your internet connection and try again.',
  },
  error: {
    icon: AlertCircle,
    color: 'text-red-500',
    bg: 'bg-red-100 dark:bg-red-500/10',
    defaultTitle: 'Something went wrong',
    defaultDescription: 'An error occurred while loading this data. Please try again.',
  },
  generic: {
    icon: Inbox,
    color: 'text-muted-foreground',
    bg: 'bg-muted/40',
    defaultTitle: 'Nothing here yet',
    defaultDescription: 'Data will appear here once it becomes available.',
  },
};

function EmptyIllustration({ icon: Icon, color, bg }: { icon: typeof Users; color: string; bg: string }) {
  return (
    <div className="relative mx-auto w-28 h-28 flex items-center justify-center">
     
      <motion.div
        className={cn('absolute inset-0 rounded-full', bg, 'opacity-30')}
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
      />
      <motion.div
        className={cn('absolute inset-3 rounded-full', bg, 'opacity-50')}
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut', delay: 0.3 }}
      />
      <motion.div
        className={cn('relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center neu-flat', bg)}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', duration: 0.6 }}
      >
        <Icon className={cn('w-7 h-7', color)} />
      </motion.div>
    </div>
  );
}

export function EmptyState({
  variant = 'generic',
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  const config = variantConfig[variant];
  const displayTitle = title ?? config.defaultTitle;
  const displayDescription = description ?? config.defaultDescription;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={cn(
        'flex flex-col items-center justify-center py-16 px-6 text-center',
        className
      )}
    >
      <EmptyIllustration
        icon={config.icon}
        color={config.color}
        bg={config.bg}
      />

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 space-y-2 max-w-xs"
      >
        <h3 className="text-base font-semibold">{displayTitle}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{displayDescription}</p>
      </motion.div>

      {action && (
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          onClick={action.onClick}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="mt-6 flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-primary text-white text-sm font-medium shadow-lg hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          {action.label}
        </motion.button>
      )}
    </motion.div>
  );
}

export function EmptyRow({
  message = 'No data available',
  colSpan = 5,
}: {
  message?: string;
  colSpan?: number;
}) {
  return (
    <tr>
      <td colSpan={colSpan} className="py-12 text-center">
        <div className="flex flex-col items-center gap-2">
          <Inbox className="w-8 h-8 text-muted-foreground/40" />
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
      </td>
    </tr>
  );
}

export function EmptyCard({
  message = 'Nothing here yet',
  className,
}: {
  message?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-10 px-6 text-center neu-flat',
        className
      )}
    >
      <Inbox className="w-8 h-8 text-muted-foreground/40 mb-2" />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}
