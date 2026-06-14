'use client';

import { motion } from 'framer-motion';
import { recentActivities } from '@/data/dashboard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserPlus, LogOut, TrendingUp, Trophy, Megaphone, Cake } from 'lucide-react';

const typeIcons: Record<string, { icon: typeof UserPlus; color: string }> = {
  join: { icon: UserPlus, color: '#10B981' },
  leave: { icon: LogOut, color: '#F59E0B' },
  promotion: { icon: TrendingUp, color: '#6366F1' },
  achievement: { icon: Trophy, color: '#EC4899' },
  announcement: { icon: Megaphone, color: '#3B82F6' },
  birthday: { icon: Cake, color: '#F97316' },
};

export function ActivityTimeline() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
      className="neu-flat p-5"
    >
      <h3 className="text-sm font-semibold mb-4">Recent Activity</h3>
      <div className="space-y-1">
        {recentActivities.map((activity, index) => {
          const typeInfo = typeIcons[activity.type];
          const Icon = typeInfo?.icon || Megaphone;
          const color = typeInfo?.color || '#6366F1';

          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-muted/30 transition-colors group"
            >
              <div className="relative shrink-0">
                {activity.avatar ? (
                  <Avatar className="w-9 h-9">
                    <AvatarImage src={activity.avatar} />
                    <AvatarFallback className="text-xs">{activity.title[0]}</AvatarFallback>
                  </Avatar>
                ) : (
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center"
                    style={{ background: `${color}20` }}
                  >
                    <Icon className="w-4 h-4" style={{ color }} />
                  </div>
                )}
                {index < recentActivities.length - 1 && (
                  <div className="absolute left-1/2 top-10 w-px h-5 bg-border/60 -translate-x-1/2" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium leading-snug">{activity.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                  {activity.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
