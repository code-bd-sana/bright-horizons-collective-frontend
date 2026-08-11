import type { DemoRole } from '@/lib/demo-session';

type DemoAccount = {
  role: DemoRole;
  email: string;
  password: string;
};

const accounts: DemoAccount[] = [
  { role: 'parent', email: 'parent@gmail.com', password: 'parent@123' },
  { role: 'admin', email: 'admin@gmail.com', password: 'admin@123' },
];

function constantTimeEquals(left: string, right: string) {
  const encoder = new TextEncoder();
  const leftBytes = encoder.encode(left);
  const rightBytes = encoder.encode(right);
  let difference = leftBytes.length ^ rightBytes.length;
  const length = Math.max(leftBytes.length, rightBytes.length);

  for (let index = 0; index < length; index += 1) {
    difference |= (leftBytes[index] ?? 0) ^ (rightBytes[index] ?? 0);
  }

  return difference === 0;
}

export function authenticateDemoAccount(email: string, password: string): DemoRole | null {
  const normalizedEmail = email.trim().toLowerCase();

  for (const account of accounts) {
    const matchesEmail = constantTimeEquals(normalizedEmail, account.email);
    const matchesPassword = constantTimeEquals(password, account.password);
    if (matchesEmail && matchesPassword) return account.role;
  }

  return null;
}
