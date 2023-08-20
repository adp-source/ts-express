export type UserRole = 'user' | 'admin';

export interface User {
  id: number;
  username: string;
  email: string;
  role: UserRole
}

export interface CreateUserRequest {
  username: string;
  email: string;
  role: UserRole
}

export interface UpdateUserRequest {
  email: string;
  role: UserRole
}