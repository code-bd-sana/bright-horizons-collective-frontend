import type { DemoRole } from '@/lib/demo-session';

export type RoleNavigationItem = {
  name: string;
  href: string;
  icon: string;
  match?: 'exact' | 'prefix';
};

type RoleProfile = {
  name: string;
  roleLabel: string;
  image: string;
  imageClassName: string;
  chevron: string;
  logout: string;
};

export type RoleConfig = {
  menuItems: RoleNavigationItem[];
  otherItems: RoleNavigationItem[];
  profile: RoleProfile;
  header: {
    showChildProfile: boolean;
    accountEmail: string;
    accountMenuItems: Array<{ label: string; icon: string }>;
  };
};

export const roleConfigs: Record<DemoRole, RoleConfig> = {
  parent: {
    menuItems: [
      {
        name: 'Dashboard',
        href: '/dashboard',
        icon: '/Home/figma-dashboard-nav-dashboard.svg',
        match: 'exact',
      },
      {
        name: 'Weekly Plans',
        href: '/dashboard/weekly-plans',
        icon: '/Home/figma-dashboard-nav-weekly.svg',
        match: 'prefix',
      },
      {
        name: 'Explore',
        href: '/dashboard/explore',
        icon: '/Home/figma-dashboard-nav-explore.svg',
        match: 'prefix',
      },
      {
        name: 'Messages',
        href: '/dashboard/messages',
        icon: '/Home/figma-dashboard-nav-messages.svg',
        match: 'exact',
      },
      {
        name: 'Child Profiles',
        href: '/dashboard/child-profiles',
        icon: '/Home/figma-dashboard-nav-child-profiles.svg',
        match: 'prefix',
      },
    ],
    otherItems: [
      {
        name: 'Settings',
        href: '/dashboard/settings',
        icon: '/Home/figma-dashboard-nav-settings.svg',
        match: 'exact',
      },
      {
        name: 'Support',
        href: '/dashboard/support',
        icon: '/Home/figma-dashboard-nav-support.svg',
        match: 'exact',
      },
    ],
    profile: {
      name: 'Sarah Johnson',
      roleLabel: 'Parent',
      image: '/Home/figma-dashboard-avatar.png',
      imageClassName: 'object-cover object-[50%_10%]',
      chevron: '/Home/figma-dashboard-chevron.svg',
      logout: '/Home/figma-dashboard-logout.svg',
    },
    header: {
      showChildProfile: true,
      accountEmail: 'sarahlin@gmail.com',
      accountMenuItems: [
        { label: 'My Account', icon: '/Home/figma-dashboard-profile-account.svg' },
        { label: 'Settings Overview', icon: '/Home/figma-dashboard-profile-settings.svg' },
        { label: 'Support and Help', icon: '/Home/figma-dashboard-profile-support.svg' },
        { label: 'Membership and Billing', icon: '/Home/figma-dashboard-profile-billing.svg' },
      ],
    },
  },
  admin: {
    menuItems: [
      {
        name: 'Dashboard',
        href: '/dashboard/admin',
        icon: '/Home/figma-admin-sidebar-dashboard.svg',
        match: 'exact',
      },
      {
        name: 'Activities Library',
        href: '/dashboard/admin/activities-library',
        icon: '/Home/figma-admin-sidebar-activities.svg',
        match: 'prefix',
      },
      {
        name: 'Weekly Plans',
        href: '/dashboard/admin/weekly-plans',
        icon: '/Home/figma-admin-sidebar-weekly.svg',
        match: 'prefix',
      },
      {
        name: 'Families',
        href: '/dashboard/admin/families',
        icon: '/Home/figma-admin-sidebar-families.svg',
        match: 'prefix',
      },
      {
        name: 'Parent Resources',
        href: '/dashboard/admin/parent-resources',
        icon: '/Home/figma-admin-sidebar-resources.svg',
        match: 'prefix',
      },
      {
        name: 'Therapy Toys',
        href: '/dashboard/admin/therapy-toys',
        icon: '/Home/figma-admin-sidebar-toys.svg',
        match: 'prefix',
      },
      {
        name: 'Messages',
        href: '/dashboard/admin/messages',
        icon: '/Home/figma-admin-sidebar-messages.svg',
        match: 'prefix',
      },
      {
        name: 'Memberships',
        href: '/dashboard/admin/memberships',
        icon: '/Home/figma-admin-sidebar-memberships.svg',
        match: 'prefix',
      },
      {
        name: 'Settings',
        href: '/dashboard/admin/settings',
        icon: '/Home/figma-admin-sidebar-settings.svg',
        match: 'prefix',
      },
    ],
    otherItems: [],
    profile: {
      name: 'Jaicy',
      roleLabel: 'Admin',
      image: '/Home/figma-admin-sidebar-avatar.png',
      imageClassName: 'object-cover',
      chevron: '/Home/figma-admin-sidebar-chevron.svg',
      logout: '/Home/figma-admin-sidebar-logout.svg',
    },
    header: {
      showChildProfile: false,
      accountEmail: 'admin@jaicys.com',
      accountMenuItems: [
        { label: 'My Account', icon: '/Home/figma-dashboard-profile-account.svg' },
        { label: 'Admin Settings', icon: '/Home/figma-dashboard-profile-settings.svg' },
      ],
    },
  },
};

export function getRoleConfig(role?: DemoRole): RoleConfig {
  return roleConfigs[role ?? 'parent'];
}
