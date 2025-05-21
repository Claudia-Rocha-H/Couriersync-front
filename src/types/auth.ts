export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  role_id: number;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  role: 'administrator' | 'operator' | 'driver';
  name: string;
}