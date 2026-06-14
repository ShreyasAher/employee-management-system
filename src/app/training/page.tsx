'use client';

import { motion } from 'framer-motion';
import { PageWrapper } from '@/components/layout/page-wrapper';
import { courses, certifications, skills } from '@/data/training';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  GraduationCap, BookOpen, Award, Star, Clock, Users,
  PlayCircle, CheckCircle2, BarChart3,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const levelColors: Record<string, string> = {
  beginner: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
  intermediate: 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
  advanced: 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400',
};

const statusColors: Record<string, string> = {
  'not-started': 'bg-gray-100 text-gray-600 dark:bg-gray-500/10 dark:text-gray-400',
  'in-progress': 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
  completed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
};

const categoryColors: Record<string, string> = {
  Frontend: '#6366F1', Architecture: '#8B5CF6', Design: '#EC4899',
  DevOps: '#F97316', 'Data Science': '#10B981', 'Soft Skills': '#14B8A6',
};

export default function TrainingPage() {
  return (
    <PageWrapper title="Training & Learning" subtitle="Courses, certifications, and skill development">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Courses', value: courses.length, icon: BookOpen, color: '#6366F1' },
          { label: 'In Progress', value: courses.filter((c) => c.status === 'in-progress').length, icon: PlayCircle, color: '#3B82F6' },
          { label: 'Completed', value: courses.filter((c) => c.status === 'completed').length, icon: CheckCircle2, color: '#10B981' },
          { label: 'Certifications', value: certifications.filter((c) => c.status === 'active').length, icon: Award, color: '#F59E0B' },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="neu-flat p-4 text-center">
            <stat.icon className="w-6 h-6 mx-auto mb-2" style={{ color: stat.color }} />
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <Tabs defaultValue="courses" className="space-y-4">
        <TabsList className="neu-flat-sm p-1 bg-transparent h-auto">
          <TabsTrigger value="courses" className="rounded-lg text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">Courses</TabsTrigger>
          <TabsTrigger value="certifications" className="rounded-lg text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">Certifications</TabsTrigger>
          <TabsTrigger value="skills" className="rounded-lg text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">Skills Tracker</TabsTrigger>
        </TabsList>

        <TabsContent value="courses">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((course, i) => {
              const catColor = categoryColors[course.category] || '#6366F1';
              return (
                <motion.div key={course.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="neu-flat overflow-hidden group hover:scale-[1.02] transition-transform cursor-pointer">
                  <div className="h-2" style={{ background: catColor }} />
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <Badge className={cn('text-[10px] border-0 capitalize', levelColors[course.level])}>{course.level}</Badge>
                      <Badge className={cn('text-[10px] border-0 capitalize', statusColors[course.status])}>{course.status.replace('-', ' ')}</Badge>
                    </div>
                    <h4 className="font-semibold text-sm mt-2">{course.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{course.description}</p>
                    <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><GraduationCap className="w-3 h-3" />{course.instructor}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" />{course.enrolled}/{course.maxCapacity}</span>
                      <span className="flex items-center gap-0.5"><Star className="w-3 h-3 text-amber-500 fill-amber-500" />{course.rating}</span>
                      <span>{course.modules} modules</span>
                    </div>
                    {course.progress !== undefined && (
                      <div className="mt-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-semibold">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-1.5" />
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="certifications">
          <div className="space-y-3">
            {certifications.map((cert, i) => (
              <motion.div key={cert.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="neu-flat p-4 flex items-center gap-4">
                <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', cert.status === 'active' ? 'bg-emerald-500/10' : 'bg-gray-500/10')}>
                  <Award className={cn('w-5 h-5', cert.status === 'active' ? 'text-emerald-500' : 'text-gray-400')} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{cert.name}</p>
                  <p className="text-xs text-muted-foreground">{cert.issuer} • ID: {cert.credentialId}</p>
                </div>
                <div className="text-right text-xs">
                  <p className="text-muted-foreground">Issued: {new Date(cert.date).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</p>
                  {cert.expiryDate && <p className="text-muted-foreground">Expires: {new Date(cert.expiryDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</p>}
                </div>
                <Badge className={cn('text-[10px] border-0 capitalize', cert.status === 'active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' : 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400')}>{cert.status}</Badge>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="skills">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(skills.reduce((acc, skill) => {
              if (!acc[skill.category]) acc[skill.category] = [];
              acc[skill.category].push(skill);
              return acc;
            }, {} as Record<string, typeof skills>)).map(([category, categorySkills], i) => (
              <motion.div key={category} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="neu-flat p-5">
                <h4 className="text-sm font-semibold mb-4 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-primary" /> {category}
                </h4>
                <div className="space-y-3">
                  {categorySkills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-muted-foreground">{skill.level}/{skill.maxLevel}</span>
                      </div>
                      <div className="flex gap-1">
                        {Array.from({ length: skill.maxLevel }).map((_, idx) => (
                          <div
                            key={idx}
                            className={cn('h-2 flex-1 rounded-full transition-colors', idx < skill.level ? 'bg-primary' : 'bg-muted')}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </PageWrapper>
  );
}
