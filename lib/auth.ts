import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import type { Session, User } from './types';

const secretKey = new TextEncoder().encode(
  process.env.AUTH_SECRET || 'hot-or-not-leads-secret-key-2002'
);

// Mock user database - in production this would be a real database
const users: User[] = [
  {
    id: '1',
    email: 'demo@hotornot.com',
    name: 'Demo User',
    passwordHash: '$2a$10$m9SF5L1FFt/5kBW0DjDh/uDho4SJsjbJ0j5hUaB2minPRqf9M3YOC', // password: demo123
  },
];

// Anonymous session for non-logged-in users
export function getAnonymousSession(): Session {
  return {
    userId: 'anonymous',
    email: '',
    name: 'Guest',
  };
}

export async function getSessionOrAnonymous(): Promise<Session> {
  const session = await getSession();
  return session || getAnonymousSession();
}

export async function hashPassword(password: string): Promise<string> {
  const bcrypt = await import('bcryptjs');
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const bcrypt = await import('bcryptjs');
  return bcrypt.compare(password, hash);
}

export async function createSession(user: Omit<User, 'passwordHash'>): Promise<string> {
  const session: Session = {
    userId: user.id,
    email: user.email,
    name: user.name,
  };

  const token = await new SignJWT(session as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(secretKey);

  return token;
}

export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;

  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload as unknown as Session;
  } catch {
    return null;
  }
}

export async function login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  const user = users.find((u) => u.email === email);

  if (!user) {
    return { success: false, error: 'Invalid email or password' };
  }

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) {
    return { success: false, error: 'Invalid email or password' };
  }

  const token = await createSession({ id: user.id, email: user.email, name: user.name });
  const cookieStore = await cookies();
  cookieStore.set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return { success: true };
}

export async function signup(email: string, password: string, name: string): Promise<{ success: boolean; error?: string }> {
  const existing = users.find((u) => u.email === email);
  if (existing) {
    return { success: false, error: 'Email already registered' };
  }

  const passwordHash = await hashPassword(password);
  const newUser: User = {
    id: String(users.length + 1),
    email,
    name,
    passwordHash,
  };
  users.push(newUser);

  const token = await createSession({ id: newUser.id, email: newUser.email, name: newUser.name });
  const cookieStore = await cookies();
  cookieStore.set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
  });

  return { success: true };
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('session');
}
