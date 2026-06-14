'use client';

import { use } from 'react';
import { motion } from 'framer-motion';
import { PageWrapper } from '@/components/layout/page-wrapper';
import { getEmployeeById, employees } from '@/data/employees';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Mail, Phone, MapPin, Building2, Calendar, Briefcase, GraduationCap,
  FileText, Award, Clock, ArrowLeft, Edit,
} from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { skills } from '@/data/training';

const statusColors: Record<string, string> = {
  active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
  inactive: 'bg-gray-100 text-gray-600 dark:bg-gray-500/10 dark:text-gray-400',
  'on-leave': 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
  terminated: 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400',
};

export default function EmployeeProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const employee = getEmployeeById(id);

  if (!employee) {
    notFound();
  }

  return (
    <PageWrapper>
      
      <Link
        href="/employees"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Employees
      </Link>

      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="neu-flat overflow-hidden mb-6"
      >
        <div className="gradient-primary p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-5">
            <Avatar className="w-24 h-24 ring-4 ring-white/20">
              <AvatarImage src={employee.avatar} />
              <AvatarFallback className="bg-white/20 text-white text-3xl">
                {employee.firstName[0]}{employee.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left text-white flex-1">
              <h1 className="text-2xl md:text-3xl font-bold">
                {employee.firstName} {employee.lastName}
              </h1>
              <p className="text-white/80 mt-1">{employee.designation}</p>
              <div className="flex flex-wrap items-center gap-2 mt-3 justify-center md:justify-start">
                <Badge className="bg-white/20 text-white border-0">{employee.employeeId}</Badge>
                <Badge className="bg-white/20 text-white border-0">{employee.department}</Badge>
                <Badge className={`${statusColors[employee.status]} border-0`}>{employee.status}</Badge>
              </div>
            </div>
            <button className="px-4 py-2 rounded-xl bg-white/20 text-white text-sm font-medium hover:bg-white/30 transition-colors flex items-center gap-2 backdrop-blur-sm">
              <Edit className="w-4 h-4" /> Edit Profile
            </button>
          </div>
        </div>

        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
          <QuickInfo icon={Mail} label="Email" value={employee.email} />
          <QuickInfo icon={Phone} label="Phone" value={employee.phone} />
          <QuickInfo icon={MapPin} label="Location" value={`${employee.city}, ${employee.state}`} />
          <QuickInfo icon={Calendar} label="Joined" value={new Date(employee.joiningDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} />
        </div>
      </motion.div>

      
      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList className="neu-flat-sm p-1 bg-transparent h-auto flex flex-wrap gap-1">
          {['personal', 'skills', 'experience', 'documents', 'performance', 'attendance'].map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="rounded-lg text-xs capitalize data-[state=active]:shadow-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2"
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="personal">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="neu-flat p-5 space-y-4">
              <h3 className="font-semibold text-sm">Personal Information</h3>
              <InfoRow label="Full Name" value={`${employee.firstName} ${employee.lastName}`} />
              <InfoRow label="Gender" value={employee.gender} />
              <InfoRow label="Date of Birth" value={new Date(employee.dateOfBirth).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })} />
              <InfoRow label="Email" value={employee.email} />
              <InfoRow label="Phone" value={employee.phone} />
            </div>
            <div className="neu-flat p-5 space-y-4">
              <h3 className="font-semibold text-sm">Address & Work</h3>
              <InfoRow label="Address" value={employee.address} />
              <InfoRow label="City" value={employee.city} />
              <InfoRow label="State" value={employee.state} />
              <InfoRow label="Country" value={employee.country} />
              <InfoRow label="Manager" value={employee.manager || 'None'} />
              <InfoRow label="Salary" value={`₹${employee.salary.toLocaleString('en-IN')}`} />
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="skills">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="neu-flat p-5">
              <h3 className="font-semibold text-sm mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {employee.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="px-3 py-1.5 text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="neu-flat p-5">
              <h3 className="font-semibold text-sm mb-4">Skill Proficiency</h3>
              <div className="space-y-3">
                {skills.slice(0, 6).map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-xs mb-1">
                      <span>{skill.name}</span>
                      <span className="text-muted-foreground">{skill.level}/{skill.maxLevel}</span>
                    </div>
                    <Progress value={(skill.level / skill.maxLevel) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="experience">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {employee.experience.length > 0 ? employee.experience.map((exp) => (
              <div key={exp.id} className="neu-flat p-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Briefcase className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{exp.role}</h4>
                    <p className="text-xs text-muted-foreground">{exp.company}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(exp.startDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })} —{' '}
                      {new Date(exp.endDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                    </p>
                    <p className="text-sm mt-2 text-muted-foreground">{exp.description}</p>
                  </div>
                </div>
              </div>
            )) : (
              <div className="neu-flat p-8 text-center">
                <Briefcase className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">No experience records available</p>
              </div>
            )}
          </motion.div>
        </TabsContent>

        <TabsContent value="documents">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            {employee.documents.length > 0 ? employee.documents.map((doc) => (
              <div key={doc.id} className="neu-flat p-4 flex items-center gap-3 hover:scale-[1.01] transition-transform cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-red-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">{doc.size} • {doc.type}</p>
                </div>
                <span className="text-xs text-muted-foreground">{new Date(doc.uploadDate).toLocaleDateString('en-IN')}</span>
              </div>
            )) : (
              <div className="neu-flat p-8 text-center">
                <FileText className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">No documents uploaded</p>
              </div>
            )}
          </motion.div>
        </TabsContent>

        <TabsContent value="performance">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="neu-flat p-5 text-center">
              <Award className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-3xl font-bold">4.2</p>
              <p className="text-xs text-muted-foreground mt-1">Overall Rating</p>
            </div>
            <div className="neu-flat p-5 text-center">
              <GraduationCap className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              <p className="text-3xl font-bold">3</p>
              <p className="text-xs text-muted-foreground mt-1">Certifications</p>
            </div>
            <div className="neu-flat p-5 text-center">
              <Clock className="w-8 h-8 text-amber-500 mx-auto mb-2" />
              <p className="text-3xl font-bold">92%</p>
              <p className="text-xs text-muted-foreground mt-1">Task Completion</p>
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="attendance">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="neu-flat p-5 text-center">
              <p className="text-3xl font-bold text-emerald-500">19</p>
              <p className="text-xs text-muted-foreground mt-1">Days Present</p>
            </div>
            <div className="neu-flat p-5 text-center">
              <p className="text-3xl font-bold text-red-500">1</p>
              <p className="text-xs text-muted-foreground mt-1">Days Absent</p>
            </div>
            <div className="neu-flat p-5 text-center">
              <p className="text-3xl font-bold text-amber-500">1</p>
              <p className="text-xs text-muted-foreground mt-1">Late Arrivals</p>
            </div>
            <div className="neu-flat p-5 text-center">
              <p className="text-3xl font-bold text-primary">90.9%</p>
              <p className="text-xs text-muted-foreground mt-1">Attendance Rate</p>
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </PageWrapper>
  );
}

function QuickInfo({ icon: Icon, label, value }: { icon: typeof Mail; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</p>
        <p className="text-sm font-medium truncate">{value}</p>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-1.5 border-b border-border/30 last:border-0">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm font-medium capitalize">{value}</span>
    </div>
  );
}
