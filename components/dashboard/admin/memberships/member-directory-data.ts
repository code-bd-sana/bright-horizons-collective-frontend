export type MembershipTier = 'Little Steps' | 'Grow Together' | 'Personalized Pathways';
export type MemberStatus = 'Active' | 'Paused';

export type Member = {
  initials: string;
  name: string;
  email: string;
  children: string;
  membershipTier: MembershipTier;
  status: MemberStatus;
  joinDate: string;
  renewalDate: string;
  currentPlan: 'Not Started' | 'In Progress' | 'Completed' | 'Paused';
};

export const members: Member[] = [
  {
    initials: 'AO',
    name: 'Amara Okonkwo',
    email: 'amara.okonkwo@email.com',
    children: 'Zara, Kofi',
    membershipTier: 'Grow Together',
    status: 'Active',
    joinDate: 'Jan 12, 2025',
    renewalDate: 'Jan 12, 2026',
    currentPlan: 'In Progress',
  },
  {
    initials: 'EM',
    name: 'Elena Martinez',
    email: 'elena.martinez@email.com',
    children: 'Sofia',
    membershipTier: 'Little Steps',
    status: 'Active',
    joinDate: 'Feb 3, 2025',
    renewalDate: 'Feb 3, 2026',
    currentPlan: 'Not Started',
  },
  {
    initials: 'WC',
    name: 'Wei Chen',
    email: 'wei.chen@email.com',
    children: 'Eli',
    membershipTier: 'Personalized Pathways',
    status: 'Active',
    joinDate: 'Dec 15, 2024',
    renewalDate: 'Dec 15, 2025',
    currentPlan: 'In Progress',
  },
  {
    initials: 'PP',
    name: 'Priya Patel',
    email: 'priya.patel@email.com',
    children: 'Mia, Arjun',
    membershipTier: 'Grow Together',
    status: 'Active',
    joinDate: 'Mar 7, 2025',
    renewalDate: 'Mar 7, 2026',
    currentPlan: 'In Progress',
  },
  {
    initials: 'YT',
    name: 'Yuki Tanaka',
    email: 'yuki.tanaka@email.com',
    children: 'Ren',
    membershipTier: 'Little Steps',
    status: 'Active',
    joinDate: 'Jan 28, 2025',
    renewalDate: 'Jan 28, 2026',
    currentPlan: 'Completed',
  },
  {
    initials: 'MW',
    name: 'Marcus Williams',
    email: 'marcus.williams@email.com',
    children: 'Jade',
    membershipTier: 'Grow Together',
    status: 'Active',
    joinDate: 'Nov 5, 2024',
    renewalDate: 'Nov 5, 2025',
    currentPlan: 'In Progress',
  },
  {
    initials: 'LN',
    name: 'Lan Nguyen',
    email: 'lan.nguyen@email.com',
    children: 'Linh, Bao',
    membershipTier: 'Personalized Pathways',
    status: 'Paused',
    joinDate: 'Oct 20, 2024',
    renewalDate: 'Oct 20, 2025',
    currentPlan: 'Paused',
  },
  {
    initials: 'FA',
    name: 'Fatima Al-Rashid',
    email: 'fatima.alrashid@email.com',
    children: 'Omar',
    membershipTier: 'Little Steps',
    status: 'Active',
    joinDate: 'Apr 2, 2025',
    renewalDate: 'Apr 2, 2026',
    currentPlan: 'Not Started',
  },
];

export function memberSlug(member: Member) {
  return member.name.toLowerCase().replaceAll(' ', '-');
}
