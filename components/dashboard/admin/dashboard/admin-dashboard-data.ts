import type { LucideIcon } from 'lucide-react';
import {
  BookOpen,
  BookPlus,
  CalendarDays,
  CirclePlus,
  ClipboardList,
  CloudUpload,
  CreditCard,
  MessageSquare,
  Puzzle,
  UserRoundPlus,
  UsersRound,
  Zap,
} from 'lucide-react';

export type DashboardMetric = {
  value: string;
  label: string;
  change: string;
  trend: 'up' | 'down';
  icon: LucideIcon;
  tone: 'teal' | 'coral' | 'amber';
};

export const dashboardMetrics: DashboardMetric[] = [
  {
    value: '1,284',
    label: 'Total Families',
    change: '12%',
    trend: 'up',
    icon: UsersRound,
    tone: 'teal',
  },
  {
    value: '2,047',
    label: 'Active Children',
    change: '8%',
    trend: 'up',
    icon: UsersRound,
    tone: 'teal',
  },
  {
    value: '893',
    label: 'Active Weekly Plans',
    change: '5%',
    trend: 'up',
    icon: CalendarDays,
    tone: 'teal',
  },
  { value: '342', label: 'Activities Library', change: '3%', trend: 'up', icon: Zap, tone: 'teal' },
  {
    value: '218',
    label: 'Parent Resources',
    change: '7%',
    trend: 'up',
    icon: BookOpen,
    tone: 'teal',
  },
  { value: '91', label: 'Therapy Toys', change: '2%', trend: 'down', icon: Puzzle, tone: 'coral' },
  {
    value: '1,102',
    label: 'Active Memberships',
    change: '15%',
    trend: 'up',
    icon: CreditCard,
    tone: 'teal',
  },
  {
    value: '24',
    label: 'Unread Messages',
    change: '4%',
    trend: 'up',
    icon: MessageSquare,
    tone: 'amber',
  },
];

export const quickActions = [
  {
    label: 'Upload Activity',
    href: '/dashboard/admin/activities-library',
    icon: CloudUpload,
    tone: 'teal',
  },
  {
    label: 'Create Weekly Plan',
    href: '/dashboard/admin/weekly-plans',
    icon: CirclePlus,
    tone: 'teal',
  },
  {
    label: 'Assign Weekly Plan',
    href: '/dashboard/admin/weekly-plans',
    icon: ClipboardList,
    tone: 'mint',
  },
  {
    label: 'Add Parent Resource',
    href: '/dashboard/admin/parent-resources/add-resource',
    icon: BookPlus,
    tone: 'mint',
  },
  {
    label: 'Add Therapy Toy',
    href: '/dashboard/admin/therapy-toys/add-toy',
    icon: Puzzle,
    tone: 'coral',
  },
  { label: 'Add Family', href: '/dashboard/admin/families', icon: UserRoundPlus, tone: 'teal' },
] as const;

export const planStatuses = [
  { label: 'Plans Created', value: '42', total: '60', progress: '70%', color: '#2f7d7e' },
  { label: 'Plans Assigned', value: '35', total: '42', progress: '83.3%', color: '#45ad56' },
  { label: 'Pending Assignment', value: '7', total: '42', progress: '16.7%', color: '#f6be3e' },
  { label: 'Completed This Week', value: '28', total: '35', progress: '80%', color: '#8fb9a8' },
];

export const recentActivity = [
  {
    icon: ClipboardList,
    tone: 'teal',
    title: 'Weekly Plan assigned to the Martinez family',
    actor: 'Admin: Jaicy, OT',
    time: '2 min ago',
  },
  {
    icon: Zap,
    tone: 'teal',
    title: 'New activity "Color Sorting Sensory Play" published',
    actor: 'Admin: Jaicy, OT',
    time: '18 min ago',
  },
  {
    icon: UserRoundPlus,
    tone: 'green',
    title: 'New family registered — The Okonkwo Family',
    actor: 'System',
    time: '1 hr ago',
  },
  {
    icon: BookPlus,
    tone: 'mint',
    title: 'Parent resource "Sleep Routines Guide" published',
    actor: 'Admin: Jaicy, OT',
    time: '2 hr ago',
  },
  {
    icon: CreditCard,
    tone: 'coral',
    title: 'Membership activated — Personalized Pathways tier',
    actor: 'System',
    time: '3 hr ago',
  },
  {
    icon: Puzzle,
    tone: 'mint',
    title: 'Therapy toy "Stacking Rings" added to library',
    actor: 'Admin: Jaicy, OT',
    time: '5 hr ago',
  },
] as const;

export const membershipDistribution = [
  { label: 'Little Steps', value: '482', progress: '43.7%', color: '#2f7d7e' },
  { label: 'Grow Together', value: '378', progress: '34.3%', color: '#8fb9a8' },
  { label: 'Personalized Pathways', value: '242', progress: '22%', color: '#f5af9a' },
];

export const parentMessages = [
  {
    initials: 'AO',
    name: 'Amara Okonkwo',
    child: 'Zara, 3y',
    message: 'Question about the sensory plan',
    time: '10 min ago',
    state: 'Unread',
  },
  {
    initials: 'LM',
    name: 'Luis Martinez',
    child: 'Sofia, 2y',
    message: 'Feedback on Week 4 activities',
    time: '1 hr ago',
    state: 'Unread',
  },
  {
    initials: 'RC',
    name: 'Rachel Chen',
    child: 'Eli, 4y',
    message: 'Requesting a plan adjustment',
    time: '3 hr ago',
    state: 'Read',
  },
  {
    initials: 'DP',
    name: 'David Patel',
    child: 'Mia, 1y',
    message: 'Milestone tracking clarification',
    time: 'Yesterday',
    state: 'Read',
  },
  {
    initials: 'KT',
    name: 'Keiko Tanaka',
    child: 'Ren, 2y',
    message: 'Interested in Personalized Pathways',
    time: 'Yesterday',
    state: 'Read',
  },
];
