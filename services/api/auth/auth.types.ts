export type AuthRole = 'parent' | 'admin';
export type BackendAuthRole = 'PARENTS' | 'ADMIN';

export type AuthUser = {
  id: string;
  email: string;
  role: AuthRole;
  membershipTier: string | null;
};

export type LoginInput = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

export type AuthSession = {
  user: AuthUser;
  role: AuthRole;
};
