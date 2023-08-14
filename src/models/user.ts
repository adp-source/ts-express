export type UserRole = 'user' | 'admin' | undefined;

export interface User {
  id?: number;
  username: string;
  email: string;
  role: UserRole
}
