'use client';

import { motion } from 'framer-motion';
import { PageWrapper } from '@/components/layout/page-wrapper';
import { jobListings, candidates, interviewSchedules, hiringPipelineData } from '@/data/recruitment';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import {
  Briefcase, MapPin, Clock, Users, Star, Video, Phone, User,
  ArrowRight, Calendar, ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const stageColors: Record<string, { bg: string; text: string }> = {
  applied: { bg: 'bg-gray-100 dark:bg-gray-500/10', text: 'text-gray-700 dark:text-gray-400' },
  screening: { bg: 'bg-blue-100 dark:bg-blue-500/10', text: 'text-blue-700 dark:text-blue-400' },
  interview: { bg: 'bg-amber-100 dark:bg-amber-500/10', text: 'text-amber-700 dark:text-amber-400' },
  offer: { bg: 'bg-purple-100 dark:bg-purple-500/10', text: 'text-purple-700 dark:text-purple-400' },
  hired: { bg: 'bg-emerald-100 dark:bg-emerald-500/10', text: 'text-emerald-700 dark:text-emerald-400' },
  rejected: { bg: 'bg-red-100 dark:bg-red-500/10', text: 'text-red-700 dark:text-red-400' },
};

const pipelineColors = ['#94A3B8', '#3B82F6', '#F59E0B', '#8B5CF6', '#10B981'];

export default function RecruitmentPage() {
  const openJobs = jobListings.filter((j) => j.status === 'open').length;
  const totalApplicants = jobListings.reduce((s, j) => s + j.applicants, 0);

  return (
    <PageWrapper title="Recruitment" subtitle="Job listings, candidates, and hiring pipeline">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Open Positions', value: openJobs, icon: Briefcase, color: '#6366F1' },
          { label: 'Total Applicants', value: totalApplicants, icon: Users, color: '#10B981' },
          { label: 'Interviews Today', value: interviewSchedules.filter((i) => i.status === 'scheduled').length, icon: Video, color: '#F59E0B' },
          { label: 'Hired This Month', value: 1, icon: Star, color: '#EC4899' },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="neu-flat p-4 text-center">
            <stat.icon className="w-6 h-6 mx-auto mb-2" style={{ color: stat.color }} />
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="neu-flat p-5 mb-6">
        <h3 className="text-sm font-semibold mb-4">Hiring Pipeline</h3>
        <div className="flex items-center justify-between mb-4">
          {hiringPipelineData.map((stage, i) => (
            <div key={stage.stage} className="flex-1 flex flex-col items-center relative">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg"
                style={{ background: pipelineColors[i] }}
              >
                {stage.count}
              </motion.div>
              <p className="text-xs font-medium mt-2 text-center">{stage.stage}</p>
              {i < hiringPipelineData.length - 1 && (
                <ArrowRight className="absolute right-0 top-5 md:top-6 w-4 h-4 text-muted-foreground -translate-x-1/2" />
              )}
            </div>
          ))}
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={hiringPipelineData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <XAxis dataKey="stage" tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'var(--neu-surface)', border: 'none', borderRadius: '12px', boxShadow: 'var(--neu-shadow-sm)', fontSize: '12px' }} />
              <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                {hiringPipelineData.map((_, i) => <Cell key={i} fill={pipelineColors[i]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <Tabs defaultValue="jobs" className="space-y-4">
        <TabsList className="neu-flat-sm p-1 bg-transparent h-auto">
          <TabsTrigger value="jobs" className="rounded-lg text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">Job Listings</TabsTrigger>
          <TabsTrigger value="candidates" className="rounded-lg text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">Candidates</TabsTrigger>
          <TabsTrigger value="interviews" className="rounded-lg text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">Interviews</TabsTrigger>
        </TabsList>

        <TabsContent value="jobs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jobListings.map((job, i) => (
              <motion.div key={job.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="neu-flat p-5 hover:scale-[1.01] transition-transform cursor-pointer">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="font-semibold">{job.title}</h4>
                  <Badge className={cn('text-[10px] border-0 capitalize', job.status === 'open' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' : 'bg-gray-100 text-gray-600')}>{job.status}</Badge>
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{job.department}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{job.type}</span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{job.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {job.requirements.slice(0, 3).map((r) => <Badge key={r} variant="secondary" className="text-[10px]">{r}</Badge>)}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Users className="w-3 h-3" />{job.applicants}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="candidates">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {candidates.map((cand, i) => {
              const stage = stageColors[cand.stage];
              return (
                <motion.div key={cand.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="neu-flat p-5 hover:scale-[1.02] transition-transform cursor-pointer">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="w-12 h-12"><AvatarImage src={cand.avatar} /><AvatarFallback>{cand.name[0]}</AvatarFallback></Avatar>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{cand.name}</h4>
                      <p className="text-xs text-muted-foreground">{cand.position}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={cn('text-[10px] border-0 capitalize', stage?.bg, stage?.text)}>{cand.stage}</Badge>
                    <div className="flex items-center gap-0.5 text-xs">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />{cand.rating}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{cand.experience} experience</p>
                  <div className="flex flex-wrap gap-1">
                    {cand.skills.slice(0, 3).map((s) => <Badge key={s} variant="secondary" className="text-[10px]">{s}</Badge>)}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="interviews">
          <div className="space-y-3">
            {interviewSchedules.map((interview, i) => (
              <motion.div key={interview.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="neu-flat p-4 flex items-center gap-4">
                <Avatar className="w-10 h-10"><AvatarImage src={interview.candidateAvatar} /><AvatarFallback>{interview.candidateName[0]}</AvatarFallback></Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{interview.candidateName}</p>
                  <p className="text-xs text-muted-foreground">{interview.position}</p>
                </div>
                <div className="text-right text-xs">
                  <p className="flex items-center gap-1 text-muted-foreground"><Calendar className="w-3 h-3" />{new Date(interview.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
                  <p className="text-muted-foreground">{interview.time}</p>
                </div>
                <div className="flex items-center gap-1">
                  {interview.type === 'video' && <Video className="w-4 h-4 text-blue-500" />}
                  {interview.type === 'phone' && <Phone className="w-4 h-4 text-emerald-500" />}
                  {interview.type === 'in-person' && <User className="w-4 h-4 text-purple-500" />}
                </div>
                <Badge className={cn('text-[10px] border-0 capitalize', interview.status === 'scheduled' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400' : interview.status === 'completed' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' : 'bg-gray-100 text-gray-600')}>
                  {interview.status}
                </Badge>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </PageWrapper>
  );
}
