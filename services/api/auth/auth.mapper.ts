import type { AuthRole, AuthUser, BackendAuthRole } from './auth.types';

type BackendUser = {
  id: string;
  email: string;
  role: BackendAuthRole;
  membershipTier?: string | null;
};

export function mapAuthRole(role: BackendAuthRole): AuthRole {
  return role === 'ADMIN' ? 'admin' : 'parent';
}

export function mapAuthUser(user: BackendUser): AuthUser {
  return {
    id: user.id,
    email: user.email,
    role: mapAuthRole(user.role),
    membershipTier: user.membershipTier ?? null,
  };
}
